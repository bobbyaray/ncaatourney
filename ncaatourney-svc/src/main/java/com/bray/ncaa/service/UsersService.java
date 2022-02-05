package com.bray.ncaa.service;

import com.bray.ncaa.dao.PoolUserRepository;
import com.bray.ncaa.model.PoolUser;
import com.bray.ncaa.model.UserLogin;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class UsersService {
    @Autowired
    private PoolUserRepository userRepository;

    public List<PoolUser> getAllPoolUsers(){
        return userRepository.findAll();
    }

    public PoolUser getPoolUser(String userID){
        log.info("Querying user: {}", userID);
        return userRepository.findById(userID).get();
    }

    public PoolUser getPoolUserByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public void deleteAllUsers(){
        userRepository.deleteAll();
    }

    public void deleteUser(String userID){
        log.info("Deleting user: {}", userID);
        userRepository.deleteById(userID);
    }

    public PoolUser saveUser(PoolUser user){
        log.info("Saving user: {}", user);
        return userRepository.save(user);
    }

    public String processUserLogin(UserLogin userLogin) {
        log.info("User logging in {}", userLogin);
        return "ok";
    }
}
