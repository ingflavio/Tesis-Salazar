package com.tesis_gym.Services;

import com.tesis_gym.Controllers.Dto.UserDetailsUpdate;
import com.tesis_gym.Controllers.Dto.UserRegistrationDto;
import com.tesis_gym.Controllers.Dto.UserDetailsDto;
import com.tesis_gym.Entities.UserAccount;
import com.tesis_gym.Entities.UserDetails;
import com.tesis_gym.Repository.UserAccountRepository;
import com.tesis_gym.Repository.UserDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class ClientUserService {

    private final UserAccountRepository accountRepository;
    private final UserDetailsRepository detailsRepository;
    private final PasswordEncoder passwordEncoder;

    public ClientUserService(UserAccountRepository accountRepository,
                             UserDetailsRepository detailsRepository,
                             PasswordEncoder passwordEncoder) {
        this.accountRepository = accountRepository;
        this.detailsRepository = detailsRepository;
        this.passwordEncoder = passwordEncoder;
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
                .solvent(true)
                .build();

        return detailsRepository.save(details);
    }

    public UserDetails getUserByCedula(Long cedula) {
        return detailsRepository.findById(cedula)
                .orElseThrow(() -> new RuntimeException("User details not found"));
    }

    public List<UserDetails> getAllUsers() {
        List<UserDetails> users = (List<UserDetails>) detailsRepository.findAll();
        Date currentDate = new Date();

        for (UserDetails user : users) {
            boolean isSolvent = !currentDate.after(user.getExpiration_date());

            if (user.getSolvent() == null || user.getSolvent() != isSolvent) {
                user.setSolvent(isSolvent);
                detailsRepository.save(user);
            }
        }
        return users;
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

        return detailsRepository.save(existingUser);
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

    private Date calculateExpirationDate(Date startDate) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(startDate);
        calendar.add(Calendar.DAY_OF_YEAR, 30);
        return calendar.getTime();
    }
}