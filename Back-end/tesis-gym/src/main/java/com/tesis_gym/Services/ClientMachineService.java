package com.tesis_gym.Services;


import com.tesis_gym.Controllers.Dto.ClientMachineDto;
import com.tesis_gym.Entities.ClientMachine;
import com.tesis_gym.Repository.ClientMachineRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ClientMachineService {

    private final ClientMachineRepository machineRepository;

    public ClientMachineService(ClientMachineRepository machineRepository) {
        this.machineRepository = machineRepository;
    }

    public ClientMachine createMachine(ClientMachineDto dto) {
        ClientMachine machine = ClientMachine.builder()
                .nameMachine(dto.nameMachine())
                .status(dto.status())
                .build();
        return machineRepository.save(machine);
    }

    public ClientMachine getMachineById(Long id) {
        return machineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Machine not found"));
    }

    public List<ClientMachine> getAllMachines() {
        return (List<ClientMachine>) machineRepository.findAll();
    }

    public ClientMachine updateMachine(Long id, ClientMachineDto dto) {
        ClientMachine existingMachine = getMachineById(id);

        existingMachine.setNameMachine(dto.nameMachine());
        existingMachine.setStatus(dto.status());

        return machineRepository.save(existingMachine);
    }

    public void deleteMachine(Long id) {
        machineRepository.deleteById(id);
    }
}