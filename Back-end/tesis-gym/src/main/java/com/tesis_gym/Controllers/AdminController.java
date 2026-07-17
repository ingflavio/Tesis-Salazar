package com.tesis_gym.Controllers;

import com.tesis_gym.Controllers.Dto.PayResponseDto;
import com.tesis_gym.Entities.PaymentStatus;
import com.tesis_gym.Entities.UserAccount;
import com.tesis_gym.Services.ClientUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final ClientUserService userService;

    public AdminController(ClientUserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserAccount>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/users/{cedula}")
    public ResponseEntity<UserAccount> getUserById(@PathVariable Long cedula) {
        return ResponseEntity.ok(userService.getUserAccountByCedula(cedula));
    }

    @PutMapping("/payments/{paymentId}/verify")
    public ResponseEntity<PayResponseDto> verifyPayment(
            @PathVariable Long paymentId,
            @RequestParam PaymentStatus status) { // Pasa ACCEPTED o DENIED en la URL

        return ResponseEntity.ok(userService.verifyPayment(paymentId, status));
    }


    @DeleteMapping("/users/{cedula}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long cedula) {
        userService.deleteUser(cedula);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/admins")
    public ResponseEntity<List<UserAccount>> getAllAdmins() {
        return ResponseEntity.ok(userService.getAllAdmins());
    }

    @GetMapping("/payments")
    public ResponseEntity<List<PayResponseDto>> getAllPayments(@RequestParam(required = false) Long cedula) {
        if (cedula != null) {
            return ResponseEntity.ok(userService.getPaymentsByCedula(cedula));
        } else {
            return ResponseEntity.ok(userService.getAllPayments());
        }
    }
}