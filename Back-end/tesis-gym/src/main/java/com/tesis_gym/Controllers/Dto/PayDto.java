package com.tesis_gym.Controllers.Dto;


import com.tesis_gym.Entities.Banks;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.NotNull;

import org.springframework.web.multipart.MultipartFile; // NUEVO

public record PayDto(
        @NotNull(message = "El banco no puede estar vacío o ser inválido")
        Banks bank,

        @NotBlank(message = "El teléfono no puede estar vacío")
        String phone,

        @NotBlank(message = "La Referencia no puede estar vacía")
        String Reference_number,

        @NotNull(message = "El monto no puede ser nulo")
        @Positive(message = "El monto debe ser mayor a 0")
        Double amount,

        // NUEVO: Ahora es un archivo, no un String
        MultipartFile image
) {}