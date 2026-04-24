package com.tesis_gym.Repository;

import com.tesis_gym.Entities.ClientUser;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientUserRespotory  extends CrudRepository<ClientUser,Long> {
}
