package com.tesis_gym.Services;



import com.tesis_gym.Entities.ClientMachine;
import com.tesis_gym.Repository.ClientMachineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientMachineService {
    @Autowired
    private final ClientMachineRepository machineRepository;

    public ClientMachineService(ClientMachineRepository machineRepository) {
        this.machineRepository = machineRepository;
    }

    public ClientMachine createMachine(ClientMachine machine) {
        return machineRepository.save(machine);
    }

    public ClientMachine getMachineById(Long id) {
        return machineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Machine not found"));
    }

    public List<ClientMachine> getAllMachines() {
        return (List<ClientMachine>) machineRepository.findAll();
    }

    public ClientMachine updateMachine(Long id, ClientMachine machineDetails) {
        ClientMachine existingMachine = getMachineById(id);

        existingMachine.setName_Machine(machineDetails.getName_Machine());
        existingMachine.setStatus(machineDetails.getStatus());

        return machineRepository.save(existingMachine);
    }

    public void deleteMachine(Long id) {
        machineRepository.deleteById(id);
    }
}