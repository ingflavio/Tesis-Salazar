package com.tesis_gym.Controllers;

import com.tesis_gym.Entities.ClientUser;
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

    @PostMapping
    public ResponseEntity<ClientUser> create(@Valid @RequestBody ClientUser user) {
        return ResponseEntity.ok(userService.createUser(user));
    }

    @GetMapping("/{cedula}")
    public ResponseEntity<ClientUser> getById(@PathVariable Long cedula) {
        return ResponseEntity.ok(userService.getUserByCedula(cedula));
    }

    @GetMapping
    public ResponseEntity<List<ClientUser>> getAll() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PutMapping("/{cedula}")
    public ResponseEntity<ClientUser> update(@PathVariable Long cedula, @Valid @RequestBody ClientUser user) {
        return ResponseEntity.ok(userService.updateUser(cedula, user));
    }

    @DeleteMapping("/{cedula}")
    public ResponseEntity<Void> delete(@PathVariable Long cedula) {
        userService.deleteUser(cedula);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{cedula}/pay")
    public ResponseEntity<ClientUser> pay(@PathVariable Long cedula) {
        return ResponseEntity.ok(userService.paySubscription(cedula));
    }
}