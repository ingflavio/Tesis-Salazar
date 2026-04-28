package com.tesis_gym.Controllers;


import com.tesis_gym.Controllers.Dto.UserDetailsDto;
import com.tesis_gym.Controllers.Dto.UserDetailsUpdate;
import com.tesis_gym.Controllers.Dto.UserRegistrationDto;
import com.tesis_gym.Entities.UserAccount;
import com.tesis_gym.Entities.UserDetails;
import com.tesis_gym.Services.ClientUserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class ClientUserController {

    private final ClientUserService userService;

    public ClientUserController(ClientUserService userService) {
        this.userService = userService;
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
    public ResponseEntity<List<UserDetails>> getAll() {
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
}