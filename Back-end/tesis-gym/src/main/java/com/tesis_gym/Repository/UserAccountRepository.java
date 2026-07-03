package com.tesis_gym.Repository;

import com.tesis_gym.Entities.Roles;
import com.tesis_gym.Entities.UserAccount;
import com.tesis_gym.Entities.UserDetails;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserAccountRepository extends CrudRepository<UserAccount,Long> {

    List<UserAccount> findByRol(Roles rol);
}
