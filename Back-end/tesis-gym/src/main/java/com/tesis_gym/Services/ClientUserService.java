package com.tesis_gym.Services;

import com.tesis_gym.Controllers.Dto.*;
import com.tesis_gym.Entities.Pay;
import com.tesis_gym.Entities.Roles;
import com.tesis_gym.Entities.UserAccount;
import com.tesis_gym.Entities.UserDetails;
import com.tesis_gym.Repository.PayRepository;
import com.tesis_gym.Repository.UserAccountRepository;
import com.tesis_gym.Repository.UserDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
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

                if (details.getSolvent() == null || details.getSolvent() != isSolvent) {
                    details.setSolvent(isSolvent);
                    detailsRepository.save(details);
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

    public UserDetails paySubscription(Long cedula) {
        UserDetails user = getUserByCedula(cedula);
        Date now = new Date();

        user.setRegistration_date(now);
        user.setExpiration_date(calculateExpirationDate(now));
        user.setSolvent(true);

        return detailsRepository.save(user);
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


    private Date calculateExpirationDate(Date startDate) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(startDate);
        calendar.add(Calendar.DAY_OF_YEAR, 30);
        return calendar.getTime();
    }
}