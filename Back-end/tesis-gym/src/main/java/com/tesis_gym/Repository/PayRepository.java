package com.tesis_gym.Repository;

import com.tesis_gym.Entities.Pay;
import com.tesis_gym.Entities.PaymentStatus;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PayRepository extends CrudRepository<Pay, Long> {

    List<Pay> findByUser_Cedula(Long cedula);

    List<Pay> findByUser_CedulaAndStatus(Long cedula, PaymentStatus status);

    List<Pay> findByStatus(PaymentStatus status);

}