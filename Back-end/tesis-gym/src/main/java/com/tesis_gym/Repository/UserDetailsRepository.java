package com.tesis_gym.Repository;

import com.tesis_gym.Entities.UserDetails;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDetailsRepository extends CrudRepository<UserDetails,Long> {
}
