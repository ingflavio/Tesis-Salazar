package com.tesis_gym.Services;

import com.tesis_gym.Controllers.Dto.*;
import com.tesis_gym.Entities.*;
import com.tesis_gym.Repository.PayRepository;
import com.tesis_gym.Repository.UserAccountRepository;
import com.tesis_gym.Repository.UserDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClientUserService {

    private final UserAccountRepository accountRepository;
    private final UserDetailsRepository detailsRepository;
    private final PasswordEncoder passwordEncoder;
    private final PayRepository payRepository;

    public ClientUserService(UserAccountRepository accountRepository,
                             UserDetailsRepository detailsRepository,
                             PasswordEncoder passwordEncoder,PayRepository payRepository) {
        this.accountRepository = accountRepository;
        this.detailsRepository = detailsRepository;
        this.passwordEncoder = passwordEncoder;
        this.payRepository = payRepository;
    }

    public UserAccount registerAccount(UserRegistrationDto dto) {
        UserAccount account = UserAccount.builder()
                .cedula(dto.cedula())
                .name(dto.name())
                .password(passwordEncoder.encode(dto.password()))
                .rol(dto.rol())
                .build();
        return accountRepository.save(account);
    }

    public UserDetails completeDetails(Long cedula, UserDetailsDto dto) {
        UserAccount account = accountRepository.findById(cedula)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        Date now = new Date();
        UserDetails details = UserDetails.builder()
                .account(account)
                .firstName(dto.firstName())
                .lastName(dto.lastName())
                .email(dto.email())
                .phone(dto.phone())
                .age(dto.age())
                .height_Cm(dto.height_Cm())
                .init_weight_kg(dto.init_weight_kg())
                .last_weight_kg(dto.init_weight_kg())
                .condition(dto.condition())
                .registration_date(now)
                .expiration_date(calculateExpirationDate(now))
                .sex(dto.sex())
                .bodyFatPercentage(dto.bodyFatPercentage())
                .solvent(true)
                .build();

        return detailsRepository.save(details);
    }

    public UserDetails getUserByCedula(Long cedula) {
        return detailsRepository.findById(cedula)
                .orElseThrow(() -> new RuntimeException("User details not found"));
    }

    public List<UserAccount> getAllUsers() {
        List<UserAccount> accounts = (List<UserAccount>) accountRepository.findAll();
        Date currentDate = new Date();

        for (UserAccount account : accounts) {
            UserDetails details = account.getUserDetails();
            if (details != null && details.getExpiration_date() != null) {
                boolean isSolvent = !currentDate.after(details.getExpiration_date());
                detailsRepository.save(details);

                if (details.getSolvent() == null || details.getSolvent() != isSolvent) {
                    details.setSolvent(isSolvent);
                }
            }
        }
        return accounts;
    }

    public UserDetails updateUser(Long cedula, UserDetailsUpdate dto) {
        UserDetails existingUser = getUserByCedula(cedula);

        existingUser.setFirstName(dto.firstName());
        existingUser.setLastName(dto.lastName());
        existingUser.setEmail(dto.email());
        existingUser.setPhone(dto.phone());
        existingUser.setAge(dto.age());
        existingUser.setHeight_Cm(dto.height_Cm());
        existingUser.setLast_weight_kg(dto.last_weight_kg());
        existingUser.setCondition(dto.condition());
        existingUser.setSex(dto.sex());
        existingUser.setBodyFatPercentage(dto.bodyFatPercentage());

        return detailsRepository.save(existingUser);
    }

    private PayResponseDto mapToPayResponseDto(Pay pay) {
        return new PayResponseDto(
                pay.getId(),
                pay.getUser().getCedula(),
                pay.getUser().getName(),
                pay.getBank(),
                pay.getPhone(),
                pay.getAmount(),
                pay.getImage(),
                pay.getStatus(),
                pay.getPaymentDate()
        );
    }

    public List<PayResponseDto> getPaymentsByCedula(Long cedula) {
        List<Pay> payments = payRepository.findByUser_Cedula(cedula);
        return payments.stream()
                .map(this::mapToPayResponseDto)
                .collect(Collectors.toList());
    }

    public List<PayResponseDto> getAllPayments() {
        List<Pay> payments = (List<Pay>) payRepository.findAll();
        return payments.stream()
                .map(this::mapToPayResponseDto)
                .collect(Collectors.toList());
    }

    public boolean verifyPassword(Long cedula, String rawPassword) {
        // Buscamos la cuenta del usuario
        UserAccount account = accountRepository.findById(cedula)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        // Comparamos la contraseña en texto plano (frontend) con la encriptada (BD)
        return passwordEncoder.matches(rawPassword, account.getPassword());
    }

    public void deleteUser(Long cedula) {
        detailsRepository.deleteById(cedula);
        accountRepository.deleteById(cedula);
    }

    public UserDetails PaySubscription(Long cedula, PayDto payDto) {
        UserAccount account = accountRepository.findById(cedula)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        UserDetails userDetails = getUserByCedula(cedula);
        Date now = new Date();

        Pay payment = Pay.builder()
                .user(account)
                .bank(payDto.bank())
                .phone(payDto.phone())
                .Reference_number(payDto.Reference_number())
                .amount(payDto.amount())
                .image(payDto.image())
                .status(PaymentStatus.PENDING) // Siempre entra como pendiente
                .build();
        payRepository.save(payment);

        // LÓGICA DE DÍAS: Damos 1 día de gracia
        Calendar cal = Calendar.getInstance();

        // Si ya estaba vencido, contamos desde hoy. Si aún le quedaban días, sumamos a su fecha actual.
        if (userDetails.getExpiration_date() != null && userDetails.getExpiration_date().after(now)) {
            cal.setTime(userDetails.getExpiration_date());
        } else {
            cal.setTime(now);
            userDetails.setRegistration_date(now); // Reiniciamos su fecha de inicio
        }

        cal.add(Calendar.DAY_OF_YEAR, 1); // +1 Día de gracia

        userDetails.setExpiration_date(cal.getTime());
        userDetails.setSolvent(true);

        return detailsRepository.save(userDetails);
    }

    public PayResponseDto verifyPayment(Long paymentId, PaymentStatus newStatus) {
        Pay payment = payRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Pago no encontrado"));

        if (payment.getStatus() != PaymentStatus.PENDING) {
            throw new RuntimeException("Este pago ya fue procesado");
        }

        payment.setStatus(newStatus);
        payRepository.save(payment);

        UserDetails userDetails = payment.getUser().getUserDetails();
        Calendar cal = Calendar.getInstance();
        cal.setTime(userDetails.getExpiration_date());

        if (newStatus == PaymentStatus.ACCEPTED) {
            cal.add(Calendar.DAY_OF_YEAR, 29);
            userDetails.setExpiration_date(cal.getTime());
            userDetails.setSolvent(true);
            detailsRepository.save(userDetails);

        } else if (newStatus == PaymentStatus.DENIED) {
            cal.add(Calendar.DAY_OF_YEAR, -1);
            userDetails.setExpiration_date(cal.getTime());
            boolean isSolvent = !new Date().after(userDetails.getExpiration_date());
            userDetails.setSolvent(isSolvent);
            detailsRepository.save(userDetails);
        }

        return mapToPayResponseDto(payment);
    }



    public List<UserAccount> getAllAdmins() {
        List<UserAccount> admins = accountRepository.findByRol(Roles.Admin);
        Date currentDate = new Date();
        for (UserAccount admin : admins) {
            UserDetails details = admin.getUserDetails();
            if (details != null && details.getExpiration_date() != null) {
                boolean isSolvent = !currentDate.after(details.getExpiration_date());
                if (details.getSolvent() == null || details.getSolvent() != isSolvent) {
                    details.setSolvent(isSolvent);
                    detailsRepository.save(details);
                }
            }
        }
        return admins;
    }

    public UserAccount getUserAccountByCedula(Long cedula) {
        return accountRepository.findById(cedula)
                .orElseThrow(() -> new RuntimeException("User account not found"));
    }

    public UserDetails paySubscription(Long cedula, PayDto payDto) {

        UserAccount account = accountRepository.findById(cedula)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        UserDetails userDetails = getUserByCedula(cedula);
        Pay payment = Pay.builder()
                .user(account)
                .bank(payDto.bank())
                .phone(payDto.phone())
                .amount(payDto.amount())
                .Reference_number(payDto.Reference_number())
                .image(payDto.image())
                .build();
        payRepository.save(payment);

        Date now = new Date();
        userDetails.setRegistration_date(now);
        userDetails.setExpiration_date(calculateExpirationDate(now));
        userDetails.setSolvent(true);

        return detailsRepository.save(userDetails);
    }

    public UserAccount updateUserByAdmin(Long cedula, AdminUserUpdateDto dto) {
        UserAccount account = accountRepository.findById(cedula)
                .orElseThrow(() -> new RuntimeException("Cuenta de usuario no encontrada"));
        account.setName(dto.name());
        account.setRol(dto.rol());
        accountRepository.save(account);
        Optional<UserDetails> detailsOpt = detailsRepository.findById(cedula);
        if (detailsOpt.isPresent()) {
            UserDetails details = detailsOpt.get();
            if (dto.firstName() != null) details.setFirstName(dto.firstName());
            if (dto.lastName() != null) details.setLastName(dto.lastName());
            if (dto.email() != null) details.setEmail(dto.email());
            if (dto.phone() != null) details.setPhone(dto.phone());
            if (dto.age() != null) details.setAge(dto.age());
            if (dto.height_Cm() != null) details.setHeight_Cm(dto.height_Cm());
            if (dto.last_weight_kg() != null) details.setLast_weight_kg(dto.last_weight_kg());
            if (dto.condition() != null) details.setCondition(dto.condition());
            if (dto.sex() != null) details.setSex(dto.sex());
            if (dto.bodyFatPercentage() != null) details.setBodyFatPercentage(dto.bodyFatPercentage());

            detailsRepository.save(details);
        }

        return accountRepository.findById(cedula).get();
    }



    private Date calculateExpirationDate(Date startDate) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(startDate);
        calendar.add(Calendar.DAY_OF_YEAR, 30);
        return calendar.getTime();
    }
}