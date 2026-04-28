package com.tesis_gym.Controllers.Dto;

public record UserDetailsUpdate(
        String firstName,
        String lastName,
        String email,
        String phone,
        Integer age,
        Float height_Cm,
        Float last_weight_kg,
        String condition
) {}