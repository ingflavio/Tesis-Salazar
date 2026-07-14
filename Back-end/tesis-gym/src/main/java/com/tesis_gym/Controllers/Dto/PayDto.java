package com.tesis_gym.Controllers.Dto;


import com.tesis_gym.Entities.Banks;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.NotNull;

public record PayDto(
        // Cambiamos a tipo Bank y usamos @NotNull
        @NotNull(message = "El banco no puede estar vacío o ser inválido")
        Banks bank,

        @NotBlank(message = "El teléfono no puede estar vacío")
        String phone,

        @NotBlank(message = ":La Refencia puede estar vacío")
        String Reference_number,

        @NotNull(message = "El monto no puede ser nulo")
        @Positive(message = "El monto debe ser mayor a 0")
        Double amount,

        String image
) {}