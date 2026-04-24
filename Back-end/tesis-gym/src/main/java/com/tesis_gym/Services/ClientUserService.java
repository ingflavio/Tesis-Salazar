package com.tesis_gym.Services;


import com.tesis_gym.Entities.ClientUser;
import com.tesis_gym.Entities.Roles;
import com.tesis_gym.Repository.ClientUserRespotory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class ClientUserService {
    @Autowired
    private final ClientUserRespotory userRepository;

    public ClientUserService(ClientUserRespotory userRepository) {
        this.userRepository = userRepository;
    }

    public ClientUser createUser(ClientUser user) {
        if (user.getRegistration_date() == null) {
            user.setRegistration_date(new Date());
        }
        user.setExpiration_date(calculateExpirationDate(user.getRegistration_date()));
        user.setSolvent(true);
        user.setRol(Roles.User);

        return userRepository.save(user);
    }

    public ClientUser getUserByCedula(Long cedula) {
        return userRepository.findById(cedula)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<ClientUser> getAllUsers() {
        List<ClientUser> users = (List<ClientUser>) userRepository.findAll();
        Date currentDate = new Date();

        for (ClientUser user : users) {
            boolean isSolvent = !currentDate.after(user.getExpiration_date());

            if (user.getSolvent() == null || user.getSolvent() != isSolvent) {
                user.setSolvent(isSolvent);
                userRepository.save(user);
            }
        }
        return users;
    }

    public ClientUser updateUser(Long cedula, ClientUser userDetails) {
        ClientUser existingUser = getUserByCedula(cedula);

        existingUser.setFirstName(userDetails.getFirstName());
        existingUser.setLastName(userDetails.getLastName());
        existingUser.setEmail(userDetails.getEmail());
        existingUser.setPhone(userDetails.getPhone());
        existingUser.setAge(userDetails.getAge());
        existingUser.setHeight_Cm(userDetails.getHeight_Cm());
        existingUser.setInit_weight_kg(userDetails.getInit_weight_kg());
        existingUser.setLast_weight_kg(userDetails.getLast_weight_kg());
        existingUser.setPassword(userDetails.getPassword());

        return userRepository.save(existingUser);
    }

    public void deleteUser(Long cedula) {
        userRepository.deleteById(cedula);
    }

    public ClientUser paySubscription(Long cedula) {
        ClientUser user = getUserByCedula(cedula);
        Date now = new Date();

        user.setRegistration_date(now);
        user.setExpiration_date(calculateExpirationDate(now));
        user.setSolvent(true);

        return userRepository.save(user);
    }

    private Date calculateExpirationDate(Date startDate) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(startDate);
        calendar.add(Calendar.DAY_OF_YEAR, 30);
        return calendar.getTime();
    }
}