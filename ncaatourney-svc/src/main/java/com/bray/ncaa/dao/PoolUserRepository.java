package com.bray.ncaa.dao;

import com.bray.ncaa.model.PoolUser;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PoolUserRepository extends MongoRepository<PoolUser, String> {
}
