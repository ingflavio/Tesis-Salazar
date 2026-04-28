package com.tesis_gym.Repository;

import com.tesis_gym.Entities.UserAccount;
import com.tesis_gym.Entities.UserDetails;
import org.springframework.data.repository.CrudRepository;

public interface UserAccountRepository extends CrudRepository<UserAccount,Long> {
}
