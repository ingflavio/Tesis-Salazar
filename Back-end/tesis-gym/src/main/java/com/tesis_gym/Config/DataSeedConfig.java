package com.tesis_gym.Config;

import com.tesis_gym.Entities.*;
import com.tesis_gym.Repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Calendar;
import java.util.Date;

@Configuration
public class DataSeedConfig {

    @Bean
    public CommandLineRunner loadTestData(
            UserAccountRepository accountRepository,
            UserDetailsRepository detailsRepository,
            ClientMachineRepository machineRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {
            // Solo insertamos datos si la tabla de usuarios está vacía
            if (accountRepository.count() == 0) {

                // 1. Crear el Administrador
                UserAccount admin = UserAccount.builder()
                        .cedula(1234L)
                        .name("Admin Principal")
                        .password(passwordEncoder.encode("admin123")) // Contraseña encriptada
                        .rol(Roles.Admin)
                        .build();
                accountRepository.save(admin);

                // 2. Crear 3 Usuarios Normales con sus Detalles
                for (int i = 1; i <= 3; i++) {
                    Long cedula = 20000000L + i;

                    UserAccount user = UserAccount.builder()
                            .cedula(cedula)
                            .name("Usuario Prueba " + i)
                            .password(passwordEncoder.encode("user123"))
                            .rol(Roles.User)
                            .build();
                    accountRepository.save(user);

                    Date now = new Date();
                    Calendar cal = Calendar.getInstance();
                    cal.setTime(now);
                    cal.add(Calendar.DAY_OF_YEAR, 30); // 30 días de solvencia

                    UserDetails details = UserDetails.builder()
                            .account(user)
                            .firstName("Nombre " + i)
                            .lastName("Apellido " + i)
                            .email("user" + i + "@test.com")
                            .phone("0414123456" + i)
                            .age(20 + i)
                            .height_Cm(170.0f)
                            .init_weight_kg(70.0f)
                            .last_weight_kg(70.0f)
                            .condition("Ninguna")
                            .solvent(true)
                            .registration_date(now)
                            .expiration_date(cal.getTime())
                            .sex("M")
                            .bodyFatPercentage(15.0f)
                            .build();
                    detailsRepository.save(details);
                }
                System.out.println("✅ Datos de prueba de usuarios cargados.");
            }

            // 3. Crear Máquinas
            if (machineRepository.count() == 0) {
                ClientMachine m1 = ClientMachine.builder()
                        .nameMachine("Cinta de Correr Pro")
                        .status(true)
                        .build();

                ClientMachine m2 = ClientMachine.builder()
                        .nameMachine("Prensa de Piernas")
                        .status(true)
                        .build();

                machineRepository.save(m1);
                machineRepository.save(m2);
                System.out.println("✅ Datos de prueba de máquinas cargados.");
            }
        };
    }
}