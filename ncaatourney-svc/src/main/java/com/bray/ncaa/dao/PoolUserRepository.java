package com.bray.ncaa.dao;

import com.bray.ncaa.model.PoolUser;
import com.bray.ncaa.model.UserPicks;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PoolUserRepository extends MongoRepository<PoolUser, String> {
    public PoolUser findByEmail(String email);
}
