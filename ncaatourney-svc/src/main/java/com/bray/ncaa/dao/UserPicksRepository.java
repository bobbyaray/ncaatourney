package com.bray.ncaa.dao;

import com.bray.ncaa.model.UserPicks;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserPicksRepository extends MongoRepository<UserPicks, String> {
    public UserPicks findByUserID(String userID);
}
