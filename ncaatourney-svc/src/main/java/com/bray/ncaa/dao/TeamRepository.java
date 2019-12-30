package com.bray.ncaa.dao;

import com.bray.ncaa.model.Team;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TeamRepository extends MongoRepository<Team, String> {
    public List<Team> findBySeed(short seed);
}
