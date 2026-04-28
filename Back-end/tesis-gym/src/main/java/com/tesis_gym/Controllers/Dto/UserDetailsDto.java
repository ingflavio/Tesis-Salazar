package com.tesis_gym.Controllers.Dto;

public record UserDetailsDto(
        String firstName,
        String lastName,
        String email,
        String phone,
        Integer age,
        Float height_Cm,
        Float init_weight_kg,
        String condition
) {}