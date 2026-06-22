package com.tesis_gym.Controllers.Dto;

import jakarta.validation.constraints.NotBlank;

public record PasswordVerifyDto(
        @NotBlank(message = "La contraseña no puede estar vacía")
        String password
) {}