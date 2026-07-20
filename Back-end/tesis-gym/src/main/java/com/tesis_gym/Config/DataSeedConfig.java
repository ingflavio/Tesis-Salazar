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
                            .password(passwordEncoder.encode("admin123"))
                            .rol(Roles.Admin)
                            .build();
                    accountRepository.save(admin);
                }

                // ==========================================
                // 2. CREAR 40 USUARIOS NORMALES
                // ==========================================
                // Formato: {Cédula, Username, Nombre, Apellido, sex, phone, height, weight, fat}
                // TODOS los valores como String
                // ==========================================
                // 2. CREAR 40 USUARIOS NORMALES
                // ==========================================
                // Formato: {Cédula, Username, Nombre, Apellido, age, sex, phone, height, weight, fat}
                String[][] usersData = {
                    // Los 5 usuarios originales con edades corregidas
                    {"3078942", "juanPerez", "Juan", "Perez", "28", "M", "04126667890", "175.0", "72.0", "14.5"},     
                    {"312479", "miguelGomez", "Miguel", "Gomez", "35", "M", "04166678901", "178.0", "75.0", "15.0"},  
                    {"2657890", "sofiaCastro", "Sofia", "Castro", "22", "F", "04246678902", "165.0", "58.0", "22.0"},   
                    {"256564", "pedroMendoza", "Pedro", "Mendoza", "45", "M", "04166678903", "180.0", "80.0", "16.0"},   
                    {"3021234", "lauraGimenez", "Laura", "Gimenez", "25", "F", "04126678904", "168.0", "60.0", "21.0"},
                    
                    // Nuevos usuarios (35 adicionales) con cédulas únicas
                    {"112567890", "carlosRodriguez", "Carlos", "Rodriguez", "28", "M", "04246678905", "176.0", "74.0", "15.5"},
                    {"1223456789", "mariaLopez", "Maria", "Lopez", "22", "F", "04126678906", "162.0", "55.0", "23.0"},
                    {"13234567890", "joseMartinez", "Jose", "Martinez", "30", "M", "04146678907", "179.0", "78.0", "16.5"},
                    {"14245678901", "anaGonzalez", "Ana", "Gonzalez", "25", "F", "04226678908", "164.0", "57.0", "22.5"},
                    {"15256789012", "pedroFernandez", "Pedro", "Fernandez", "35", "M", "04166678909", "177.0", "76.0", "15.0"},
                    {"16267890123", "lauraDiaz", "Laura", "Diaz", "22", "F", "04246678910", "166.0", "59.0", "21.5"},
                    {"17278901234", "davidVargas", "David", "Vargas", "28", "M", "04126678911", "182.0", "82.0", "17.0"},
                    {"18289012345", "carmenSanchez", "Carmen", "Sanchez", "24", "F", "04166678912", "163.0", "56.0", "23.5"},
                    {"19290123456", "robertoRamos", "Roberto", "Ramos", "32", "M", "04246678913", "175.0", "73.0", "14.0"},
                    {"2021234567", "isabelCastillo", "Isabel", "Castillo", "22", "F", "04126678914", "167.0", "60.0", "22.0"},
                    {"2122345678", "fernandoHernandez", "Fernando", "Hernandez", "30", "M", "04146678915", "180.0", "79.0", "16.0"},
                    {"2223456789", "patriciaMendoza", "Patricia", "Mendoza", "25", "F", "04226678916", "165.0", "58.0", "22.0"},
                    {"2324567890", "andresOrtega", "Andres", "Ortega", "35", "M", "04166678917", "178.0", "77.0", "15.5"},
                    {"2425678901", "dianaParedes", "Diana", "Paredes", "22", "F", "04246678918", "162.0", "54.0", "24.0"},
                    {"2526789012", "javierRivas", "Javier", "Rivas", "28", "M", "04126678919", "176.0", "75.0", "14.5"},
                    {"2627890123", "monicaSilva", "Monica", "Silva", "24", "F", "04166678920", "168.0", "61.0", "21.0"},
                    {"2728901234", "alejandroTorres", "Alejandro", "Torres", "30", "M", "04246678921", "183.0", "84.0", "17.5"},
                    {"2829012345", "gloriaNavarro", "Gloria", "Navarro", "22", "F", "04126678922", "164.0", "57.0", "23.0"},
                    {"29212345678", "manuelGutierrez", "Manuel", "Gutierrez", "32", "M", "04146678923", "179.0", "78.0", "16.0"},
                    {"30223456789", "veronicaRomero", "Veronica", "Romero", "25", "F", "04226678924", "166.0", "59.0", "22.5"},
                    {"31234567890", "oscarAlvarez", "Oscar", "Alvarez", "35", "M", "04166678925", "177.0", "76.0", "15.0"},
                    {"32245678901", "sandraEspinoza", "Sandra", "Espinoza", "22", "F", "04246678926", "163.0", "55.0", "23.5"},
                    {"23256789012", "raulMorales", "Raul", "Morales", "28", "M", "04126678927", "181.0", "81.0", "17.0"},
                    {"24267890123", "luzCordero", "Luz", "Cordero", "24", "F", "04166678928", "165.0", "58.0", "22.0"},
                    {"25278901234", "hugoVillalobos", "Hugo", "Villalobos", "30", "M", "04246678929", "178.0", "77.0", "15.5"},
                    {"26289012345", "elenaPinto", "Elena", "Pinto", "22", "F", "04126678930", "167.0", "60.0", "21.5"},
                    {"27290123456", "victorReyes", "Victor", "Reyes", "32", "M", "04146678931", "176.0", "74.0", "14.0"},
                    {"2821234567", "teresaFlores", "Teresa", "Flores", "22", "F", "04226678932", "162.0", "54.0", "24.0"},
                    {"2922345678", "franciscoBermudez", "Francisco", "Bermudez", "35", "M", "04166678933", "182.0", "83.0", "17.5"},
                    {"3023456789", "carolinaDelgado", "Carolina", "Delgado", "25", "F", "04246678934", "164.0", "56.0", "23.0"},
                    {"3124567890", "luisHerrera", "Luis", "Herrera", "28", "M", "04126678935", "180.0", "79.0", "16.0"},
                    {"3225678901", "angelaContreras", "Angela", "Contreras", "22", "F", "04166678936", "166.0", "59.0", "22.0"},
                    {"2726789012", "ricardoMolina", "Ricardo", "Molina", "30", "M", "04246678937", "175.0", "72.0", "14.5"},
                    {"2427890123", "beatrizAguilar", "Beatriz", "Aguilar", "24", "F", "04126678938", "168.0", "61.0", "21.0"},
                    {"2528901234", "jorgeRojas", "Jorge", "Rojas", "35", "M", "04146678939", "179.0", "78.0", "15.5"},
                    {"2629012345", "marianaMendez", "Mariana", "Mendez", "22", "F", "04226678940", "165.0", "57.0", "22.5"},
                    {"27212345678", "arturoPena", "Arturo", "Peña", "28", "M", "04166678941", "177.0", "75.0", "15.0"}
                };

                Date now = new Date();
                Calendar cal = Calendar.getInstance();
                cal.setTime(now);
                cal.add(Calendar.DAY_OF_YEAR, 30);

                for (int i = 0; i < usersData.length; i++) {
                    Long cedula = Long.parseLong(usersData[i][0]);
                    String username = usersData[i][1];
                    String firstName = usersData[i][2];
                    String lastName = usersData[i][3];
                    Integer age = Integer.parseInt(usersData[i][4]);  // Edad
                    String sex = usersData[i][5];
                    String phone = usersData[i][6];
                    Float height = Float.parseFloat(usersData[i][7]);
                    Float weight = Float.parseFloat(usersData[i][8]);
                    Float fat = Float.parseFloat(usersData[i][9]);
                    // Verificar si la cédula ya existe
                    if (accountRepository.existsById(cedula)) {
                        System.out.println("⚠️ Usuario con cédula " + cedula + " ya existe, saltando...");
                        continue;
                    }


                    // Guardar Cuenta
                    UserAccount user = UserAccount.builder()
                            .cedula(cedula)
                            .name(username)
                            .password(passwordEncoder.encode("user123"))
                            .rol(Roles.User)
                            .build();
                    accountRepository.save(user);

                    // UserDetails para todos
                    UserDetails details = UserDetails.builder()
                            .account(user)
                            .firstName(firstName)
                            .lastName(lastName)
                            .email(username + "@mail.com")
                            .phone(phone)
                            .age(age)
                            .height_Cm(height)
                            .init_weight_kg(weight)
                            .last_weight_kg(weight)
                            .condition("Ninguna")
                            .solvent(true)
                            .registration_date(now)
                            .expiration_date(cal.getTime())
                            .sex(sex) // Ahora es String
                            .bodyFatPercentage(fat)
                            .build();
                    detailsRepository.save(details);

                    // Tipo de usuario 1: 2 PAGOS APROBADOS
                    if (i < 25) {
                        Pay pago1 = Pay.builder()
                                .user(user)
                                .bank(Banks.BANCO_DE_VENEZUELA)
                                .phone("0414000000" + i)
                                .Reference_number("REF00" + i)
                                .amount(20.0)
                                .status(PaymentStatus.ACCEPTED)
                                .paymentDate(LocalDateTime.now().minusMonths(1))
                                .build();
                        Pay pago2 = Pay.builder()
                                .user(user)
                                .bank(Banks.BANESCO)
                                .phone("0414000000" + i)
                                .Reference_number("REF00" + i + "A")
                                .amount(25.0)
                                .status(PaymentStatus.ACCEPTED)
                                .paymentDate(LocalDateTime.now())
                                .build();
                        payRepository.save(pago1);
                        payRepository.save(pago2);
                    }
                    // Tipo de usuario 2: 1 Pago Pendiente
                    else if (i < 32) {
                        Pay pagoPendiente = Pay.builder()
                                .user(user)
                                .bank(Banks.PROVINCIAL)
                                .phone("04121111111")
                                .Reference_number("REFPENDIENTE")
                                .amount(25.0)
                                .status(PaymentStatus.PENDING)
                                .paymentDate(LocalDateTime.now())
                                .build();
                        payRepository.save(pagoPendiente);
                    }
                    // Tipo de usuario 3: 1 Pago Aprobado (viejo) y 1 Pago Declinado
                    else {
                        Pay pagoAprobado = Pay.builder()
                                .user(user)
                                .bank(Banks.MERCANTIL)
                                .phone("04242222222")
                                .Reference_number("REFVIEJA")
                                .amount(20.0)
                                .status(PaymentStatus.ACCEPTED)
                                .paymentDate(LocalDateTime.now().minusMonths(3))
                                .build();
                        Pay pagoDeclinado = Pay.builder()
                                .user(user)
                                .bank(Banks.MERCANTIL)
                                .phone("04242222222")
                                .Reference_number("REFDECLINADA")
                                .amount(25.0)
                                .status(PaymentStatus.DENIED)
                                .paymentDate(LocalDateTime.now())
                                .build();
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
                ClientMachine m1 = ClientMachine.builder()
                        .nameMachine("Cinta de Correr Pro")
                        .status(true)
                        .build();
                ClientMachine m2 = ClientMachine.builder()
                        .nameMachine("Prensa de Piernas")
                        .status(true)
                        .build();
                ClientMachine m3 = ClientMachine.builder()
                        .nameMachine("Polea Cruzada")
                        .status(false)
                        .build();

                machineRepository.save(m1);
                machineRepository.save(m2);
                machineRepository.save(m3);
                System.out.println("✅ Máquinas cargadas exitosamente.");
            }
        };
    }
}