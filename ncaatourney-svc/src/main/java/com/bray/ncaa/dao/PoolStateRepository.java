package com.bray.ncaa.dao;

import com.bray.ncaa.model.PoolState;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PoolStateRepository extends MongoRepository<PoolState, String> {
}
