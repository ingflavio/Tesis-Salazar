package com.tesis_gym.Controllers.Dto;

import com.tesis_gym.Entities.Banks;
import java.time.LocalDateTime;

public record PayResponseDto(
        Long id,
        Long cedula,
        String userName,
        Banks bank,
        String phone,
        Double amount,
        String image,
        LocalDateTime paymentDate
) {}