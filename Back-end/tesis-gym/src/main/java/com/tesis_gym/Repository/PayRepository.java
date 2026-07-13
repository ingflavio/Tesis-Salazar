package com.tesis_gym.Repository;

import com.tesis_gym.Entities.Pay;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PayRepository extends CrudRepository<Pay, Long> {

    List<Pay> findByUser_Cedula(Long cedula);

}