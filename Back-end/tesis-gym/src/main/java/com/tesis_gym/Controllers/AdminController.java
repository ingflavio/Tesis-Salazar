package com.tesis_gym.Controllers;

import com.tesis_gym.Controllers.Dto.AdminPayDto;
import com.tesis_gym.Controllers.Dto.AdminUserUpdateDto;
import com.tesis_gym.Controllers.Dto.UserDetailsDto;
import com.tesis_gym.Controllers.Dto.PayResponseDto;
import com.tesis_gym.Entities.PaymentStatus;
import com.tesis_gym.Entities.UserAccount;
import com.tesis_gym.Services.ClientUserService;
import com.tesis_gym.Repository.UserDetailsRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.tesis_gym.Entities.UserDetails;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final ClientUserService userService;
    private final UserDetailsRepository detailsRepository;

    public AdminController(ClientUserService userService,
                             UserDetailsRepository detailsRepository) {
        this.userService = userService;
        this.detailsRepository = detailsRepository;
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserAccount>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/users/{cedula}")
    public ResponseEntity<UserAccount> getUserById(@PathVariable Long cedula) {
        return ResponseEntity.ok(userService.getUserAccountByCedula(cedula));
    }

    @PostMapping("/users/{cedula}/details")
    public ResponseEntity<UserDetails> completeUserDetails(
            @PathVariable Long cedula,
            @Valid @RequestBody UserDetailsDto dto) {
        return ResponseEntity.ok(userService.completeDetails(cedula, dto));
    }

    @PutMapping("/payments/{paymentId}/verify")
    public ResponseEntity<PayResponseDto> verifyPayment(
            @PathVariable Long paymentId,
            @RequestParam PaymentStatus status) { // Pasa ACCEPTED o DENIED en la URL

        return ResponseEntity.ok(userService.verifyPayment(paymentId, status));
    }

    @PutMapping("/users/{cedula}")
    public ResponseEntity<UserAccount> updateUserByAdmin(
            @PathVariable Long cedula,
            @Valid @RequestBody AdminUserUpdateDto dto) {

        return ResponseEntity.ok(userService.updateUserByAdmin(cedula, dto));
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

    @PostMapping("/users/{cedula}/payments")
    public ResponseEntity<PayResponseDto> registerPaymentByAdmin(
            @PathVariable Long cedula,
            @Valid @RequestBody AdminPayDto dto) {

        return ResponseEntity.ok(userService.registerPaymentByAdmin(cedula, dto));
    }

}