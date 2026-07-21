package com.tesis_gym.Controllers.Dto;

import com.tesis_gym.Entities.Banks;
import com.tesis_gym.Entities.PaymentStatus;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

public record PayResponseDto(
        Long id,
        Long cedula,
        String userName,
        Banks bank,
        String phone,
        String Reference_number,
        Double amount,
        String image,
        LocalDateTime paymentDate,
        PaymentStatus status
) {}