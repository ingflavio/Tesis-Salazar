package com.tesis_gym.Controllers.Dto;

import com.tesis_gym.Entities.Roles;

public record UserRegistrationDto(
        Long cedula,
        String name,
        String password,
        Roles rol
) {}