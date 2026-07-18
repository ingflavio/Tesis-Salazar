package com.tesis_gym.Controllers.Dto;

import com.tesis_gym.Entities.Roles;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AdminUserUpdateDto(

        @NotBlank(message = "El nombre de cuenta no puede estar vacío")
        String name,

        @NotNull(message = "El rol no puede ser nulo")
        Roles rol,

        String firstName,
        String lastName,
        String email,
        String phone,
        Integer age,
        Float height_Cm,
        Float last_weight_kg,
        String condition,
        String sex,
        Float bodyFatPercentage
) {}