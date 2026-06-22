package com.tesis_gym.Controllers;

import com.tesis_gym.Controllers.Dto.AuthResponseDto;
import com.tesis_gym.Controllers.Dto.LoginDto;
import com.tesis_gym.Entities.UserAccount;
import com.tesis_gym.Repository.UserAccountRepository;
import com.tesis_gym.Security.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserAccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(UserAccountRepository accountRepository,
                          PasswordEncoder passwordEncoder,
                          JwtService jwtService) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
        // 1. Buscar al usuario por cédula
        UserAccount user = accountRepository.findById(loginDto.cedula())
                .orElse(null);

        // 2. Verificar si existe y si la contraseña coincide
        if (user == null || !passwordEncoder.matches(loginDto.password(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas");
        }

        // 3. Generar el JWT
        String token = jwtService.generateToken(user);

        // 4. Devolver la respuesta
        return ResponseEntity.ok(new AuthResponseDto(token, user.getCedula(), user.getRol().name()));
    }
}