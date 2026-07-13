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

    @PutMapping("/{cedula}")
    public ResponseEntity<UserDetails> update(@PathVariable Long cedula, @Valid @RequestBody UserDetailsUpdate dto) {
        return ResponseEntity.ok(userService.updateUser(cedula, dto));
    }

    @PostMapping("/pay")
    public ResponseEntity<?> pay(
            @RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody PayDto payDto) {

        String token = authHeader.substring(7);
        Long cedula = Long.valueOf(jwtService.getCedulaFromToken(token));
        return ResponseEntity.ok(userService.paySubscription(cedula, payDto));
    }

    @PostMapping("/verify-password")
    public ResponseEntity<?> verifyPassword(
            @RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody PasswordVerifyDto dto) {

        String token = authHeader.substring(7);
        Long cedula = Long.valueOf(jwtService.getCedulaFromToken(token));

        boolean isMatch = userService.verifyPassword(cedula, dto.password());
        if (isMatch) {
            return ResponseEntity.ok().body("Contraseña correcta");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Contraseña incorrecta");
        }
    }


    @GetMapping("/my-payments")
    public ResponseEntity<?> getMyPayments(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        Long cedula = Long.valueOf(jwtService.getCedulaFromToken(token));
        return ResponseEntity.ok(userService.getPaymentsByCedula(cedula));
    }
}