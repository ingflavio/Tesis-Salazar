package com.tesis_gym.Controllers.Dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ClientMachineDto(
        @NotBlank(message = "El nombre de la máquina no puede estar vacío")
        String nameMachine,

        @NotNull(message = "El estado no puede ser nulo")
        Boolean status
) {}