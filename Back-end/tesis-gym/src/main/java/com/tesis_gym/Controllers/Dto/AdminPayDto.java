package com.tesis_gym.Controllers.Dto;

import com.tesis_gym.Entities.Banks;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record AdminPayDto(
        @NotNull(message = "El método de pago no puede estar vacío")
        Banks bank,

        // No tienen @NotBlank para que puedan venir vacíos o nulos en pagos en efectivo
        String phone,
        String Reference_number,

        @NotNull(message = "El monto no puede ser nulo")
        @Positive(message = "El monto debe ser mayor a 0")
        Double amount
) {}