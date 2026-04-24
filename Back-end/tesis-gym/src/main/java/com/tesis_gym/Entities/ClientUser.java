package com.tesis_gym.Entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

import java.util.Date;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClientUser {

    @Id
    @NotNull(message = "La cedula no puede ser nula")
    private Long cedula;

    @NotBlank(message = "La Nombre no puede estar vacio")
    private String firstName;
    @NotBlank(message = "El apellido no puede estar vacio")
    private String lastName;

    @Email(message = "El Email Debe ser Valido")
    private String email;
    @NotBlank(message = "EL Telefono no puede estar vacio")
    private String phone;

    @Positive(message = "La edad debe ser mayor a 0")
    private Integer age;

    @Positive(message = "La altura debe ser un valor positivo")
    private Float height_Cm;

    @Positive(message = "El peso inicial debe ser positivo")
    private Float init_weight_kg;

    @Positive(message = "El peso actual debe ser positivo")
    private Float last_weight_kg;

    @NotBlank(message = "La contraseña no puede estar vacía")
    private String password;

    private Boolean solvent;
    @NotNull
    @PastOrPresent(message = "La fecha de registro no puede ser futura")
    @JsonFormat(pattern = "dd/MM/yyyy")
    private Date registration_date;

    @NotNull
    @JsonFormat(pattern = "dd/MM/yyyy")
    private Date expiration_date;

    private Roles rol=Roles.User;

}