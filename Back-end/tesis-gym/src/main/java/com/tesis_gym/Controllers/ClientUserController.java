package com.tesis_gym.Controllers;


import com.tesis_gym.Controllers.Dto.*;
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
    private final JwtService jwtService;

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
    public ResponseEntity<UserAccount> getById(@PathVariable Long cedula) {
        // Ahora usamos el método que busca en accountRepository
        return ResponseEntity.ok(userService.getUserAccountByCedula(cedula));
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

    @PostMapping("/pay")
    public ResponseEntity<?> pay(
            @RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody PayDto payDto) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token faltante o formato incorrecto");
        }
        String token = authHeader.substring(7);
        Long cedula;

        try {
            String cedulaStr = jwtService.getCedulaFromToken(token);
            cedula = Long.valueOf(cedulaStr);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token inválido o expirado");
        }

        UserDetails updatedUser = userService.paySubscription(cedula, payDto);

        return ResponseEntity.ok(updatedUser);
    }
    @PostMapping("/verify-password")
    public ResponseEntity<?> verifyPassword(
            @RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody PasswordVerifyDto dto) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token faltante o formato incorrecto");
        }
        String token = authHeader.substring(7);
        Long cedula;

        try {
            String cedulaStr = jwtService.getCedulaFromToken(token);
            cedula = Long.valueOf(cedulaStr);
        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token inválido o expirado");
        }


        boolean isMatch = userService.verifyPassword(cedula, dto.password());

        if (isMatch) {
            return ResponseEntity.ok().body("Contraseña correcta");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Contraseña incorrecta");
        }
    }

    @GetMapping("/admins")
    public ResponseEntity<List<UserAccount>> getAllAdmins() {
        return ResponseEntity.ok(userService.getAllAdmins());
    }







}