package com.tesis_gym.Controllers;


import com.tesis_gym.Controllers.Dto.ClientMachineDto;
import com.tesis_gym.Entities.ClientMachine;
import com.tesis_gym.Services.ClientMachineService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/machines")
public class ClientMachineController {

    private final ClientMachineService machineService;

    public ClientMachineController(ClientMachineService machineService) {
        this.machineService = machineService;
    }

    @PostMapping
    public ResponseEntity<ClientMachine> create(@Valid @RequestBody ClientMachineDto machineDto) {
        return ResponseEntity.ok(machineService.createMachine(machineDto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClientMachine> getById(@PathVariable Long id) {
        return ResponseEntity.ok(machineService.getMachineById(id));
    }

    @GetMapping
    public ResponseEntity<List<ClientMachine>> getAll() {
        return ResponseEntity.ok(machineService.getAllMachines());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClientMachine> update(@PathVariable Long id, @Valid @RequestBody ClientMachineDto machineDto) {
        return ResponseEntity.ok(machineService.updateMachine(id, machineDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        machineService.deleteMachine(id);
        return ResponseEntity.noContent().build();
    }
}