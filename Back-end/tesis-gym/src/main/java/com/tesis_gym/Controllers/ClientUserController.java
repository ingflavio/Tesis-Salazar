package com.tesis_gym.Controllers;


import com.tesis_gym.Controllers.Dto.PasswordVerifyDto;
import com.tesis_gym.Controllers.Dto.UserDetailsDto;
import com.tesis_gym.Controllers.Dto.UserDetailsUpdate;
import com.tesis_gym.Controllers.Dto.UserRegistrationDto;
import com.tesis_gym.Entities.UserAccount;
import com.tesis_gym.Entities.UserDetails;
import com.tesis_gym.Security.JwtService;
import com.tesis_gym.Services.ClientUserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class ClientUserController {

    private final ClientUserService userService;
    private final JwtService jwtService; // NUEVO: inyectamos el JwtService

    public ClientUserController(ClientUserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    @PostMapping("/register")
    public ResponseEntity<UserAccount> registerAccount(@Valid @RequestBody UserRegistrationDto dto) {
        return ResponseEntity.ok(userService.registerAccount(dto));
    }

    @PostMapping("/{cedula}/details")
    public ResponseEntity<UserDetails> completeDetails(@PathVariable Long cedula, @Valid @RequestBody UserDetailsDto dto) {
        return ResponseEntity.ok(userService.completeDetails(cedula, dto));
    }

    @GetMapping("/{cedula}")
    public ResponseEntity<UserDetails> getById(@PathVariable Long cedula) {
        return ResponseEntity.ok(userService.getUserByCedula(cedula));
    }

    @GetMapping
    public ResponseEntity<List<UserAccount>> getAll() {
        return ResponseEntity.ok(userService.getAllUsers());
    }


    @PutMapping("/{cedula}")
    public ResponseEntity<UserDetails> update(@PathVariable Long cedula, @Valid @RequestBody UserDetailsUpdate dto) {
        return ResponseEntity.ok(userService.updateUser(cedula, dto));
    }

    @DeleteMapping("/{cedula}")
    public ResponseEntity<Void> delete(@PathVariable Long cedula) {
        userService.deleteUser(cedula);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{cedula}/pay")
    public ResponseEntity<UserDetails> pay(@PathVariable Long cedula) {
        return ResponseEntity.ok(userService.paySubscription(cedula));
    }
    @PostMapping("/verify-password")
    public ResponseEntity<?> verifyPassword(
            @RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody PasswordVerifyDto dto) {

        // 1. Validar que la cabecera tenga el formato correcto
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token faltante o formato incorrecto");
        }

        // 2. Extraer el token quitando la palabra "Bearer "
        String token = authHeader.substring(7);
        Long cedula;

        // 3. Extraer la cédula del token
        try {
            String cedulaStr = jwtService.getCedulaFromToken(token);
            cedula = Long.valueOf(cedulaStr);
        } catch (Exception e) {
            // Si el token expiró, fue modificado o es inválido, caerá aquí
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token inválido o expirado");
        }

        // 4. Verificar la contraseña usando la cédula extraída de forma segura
        boolean isMatch = userService.verifyPassword(cedula, dto.password());

        if (isMatch) {
            return ResponseEntity.ok().body("Contraseña correcta");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Contraseña incorrecta");
        }
    }



}