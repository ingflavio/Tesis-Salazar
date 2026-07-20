package com.tesis_gym.Config;

import com.tesis_gym.Entities.*;
import com.tesis_gym.Repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;

@Configuration
public class DataSeedConfig {

    @Bean
    public CommandLineRunner loadTestData(
            UserAccountRepository accountRepository,
            UserDetailsRepository detailsRepository,
            ClientMachineRepository machineRepository,
            PayRepository payRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {
            if (accountRepository.count() == 0) {
                System.out.println("⏳ Inicializando base de datos con datos de prueba...");

                // ==========================================
                // 1. CREAR 3 ADMINISTRADORES
                // ==========================================
                String[][] admins = {
                        {"123", "juan gonzales"},
                        {"12345", "adminmaria"},
                        {"123456", "admincarlos"}
                };

                for (String[] ad : admins) {
                    UserAccount admin = UserAccount.builder()
                            .cedula(Long.parseLong(ad[0]))
                            .name(ad[1])
                            .password(passwordEncoder.encode("admin123")) // username + 123
                            .rol(Roles.Admin)
                            .build();
                    accountRepository.save(admin);
                }

                // ==========================================
                // 2. CREAR 5 USUARIOS NORMALES
                // ==========================================
                // Formato: {Cédula, Username, Nombre, Apellido}
                String[][] usersData = {
                        {"30078942", "juan", "Juan", "Perez"},       // Solvent, con detalles
                        {"3012479", "miguel", "Miguel", "Gomez"},   // Solvent, con detalles
                        {"5657890", "sofia", "Sofia", "Castro"},    // Solvent, con detalles
                        {"456564", "pedro", "Pedro", "Mendoza"},   // No solvent, SIN detalles
                        {"3021234", "laura", "Laura", "Gimenez"}    // No solvent, SIN detalles
                };

                Date now = new Date();
                Calendar cal = Calendar.getInstance();
                cal.setTime(now);
                cal.add(Calendar.DAY_OF_YEAR, 30); // 30 días de solvencia para los aceptados

                for (int i = 0; i < usersData.length; i++) {
                    Long cedula = Long.parseLong(usersData[i][0]);
                    String username = usersData[i][1];
                    String firstName = usersData[i][2];
                    String lastName = usersData[i][3];

                    // Guardar Cuenta (Para los 5)
                    UserAccount user = UserAccount.builder()
                            .cedula(cedula)
                            .name(username)
                            .password(passwordEncoder.encode(username + "123")) // username + 123
                            .rol(Roles.User)
                            .build();
                    accountRepository.save(user);

                    // Guardar Detalles SOLO para los 3 primeros (Son los que están solventes)
                    if (i < 3) {
                        UserDetails details = UserDetails.builder()
                                .account(user)
                                .firstName(firstName)
                                .lastName(lastName)
                                .email(username + "@test.com")
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

                        // Crear 2 PAGOS APROBADOS en diferentes fechas
                        Pay pago1 = Pay.builder().user(user).bank(Banks.BANCO_DE_VENEZUELA).phone("0414000000" + i).Reference_number("REF00" + i).amount(20.0).status(PaymentStatus.ACCEPTED).paymentDate(LocalDateTime.now().minusMonths(1)).build();
                        Pay pago2 = Pay.builder().user(user).bank(Banks.BANESCO).phone("0414000000" + i).Reference_number("REF00" + i + "A").amount(25.0).status(PaymentStatus.ACCEPTED).paymentDate(LocalDateTime.now()).build();
                        payRepository.save(pago1);
                        payRepository.save(pago2);
                    }
                    // Usuario 4: SIN detalles, 1 Pago Pendiente
                    else if (i == 3) {
                        Pay pagoPendiente = Pay.builder().user(user).bank(Banks.PROVINCIAL).phone("04121111111").Reference_number("REFPENDIENTE").amount(25.0).status(PaymentStatus.PENDING).paymentDate(LocalDateTime.now()).build();
                        payRepository.save(pagoPendiente);
                    }
                    // Usuario 5: SIN detalles, 1 Pago Aprobado (viejo) y 1 Pago Declinado (reciente)
                    else {
                        Pay pagoAprobado = Pay.builder().user(user).bank(Banks.MERCANTIL).phone("04242222222").Reference_number("REFVIEJA").amount(20.0).status(PaymentStatus.ACCEPTED).paymentDate(LocalDateTime.now().minusMonths(3)).build();
                        Pay pagoDeclinado = Pay.builder().user(user).bank(Banks.MERCANTIL).phone("04242222222").Reference_number("REFDECLINADA").amount(25.0).status(PaymentStatus.DENIED).paymentDate(LocalDateTime.now()).build();
                        payRepository.save(pagoAprobado);
                        payRepository.save(pagoDeclinado);
                    }
                }
                System.out.println("✅ Usuarios, administradores y pagos cargados exitosamente.");
            }

            // ==========================================
            // 3. CREAR 3 MÁQUINAS
            // ==========================================
            if (machineRepository.count() == 0) {
                ClientMachine m1 = ClientMachine.builder().nameMachine("Cinta de Correr Pro").status(true).build();
                ClientMachine m2 = ClientMachine.builder().nameMachine("Prensa de Piernas").status(true).build();
                ClientMachine m3 = ClientMachine.builder().nameMachine("Polea Cruzada").status(false).build(); // Una en mantenimiento

                machineRepository.save(m1);
                machineRepository.save(m2);
                machineRepository.save(m3);
                System.out.println("✅ Máquinas cargadas exitosamente.");
            }
        };
    }
}