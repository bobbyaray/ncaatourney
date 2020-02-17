package com.bray.ncaa.controller;

import com.bray.ncaa.dao.PoolUserRepository;
import com.bray.ncaa.model.PoolUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private PoolUserRepository userRepository;

    @GetMapping("/list")
    public List<PoolUser> getAllPoolUsers(){
        return userRepository.findAll();
    }

    @GetMapping()
    public PoolUser getPoolUser(@RequestParam String userID){
        return userRepository.findById(userID).get();
    }

    @GetMapping("byemail")
    public PoolUser getPoolUserByEmail(@RequestParam String email){
        return userRepository.findByEmail(email);
    }

    @DeleteMapping("/deleteall")
    public void deleteAllUsers(){
        userRepository.deleteAll();
    }

    @DeleteMapping()
    public void deleteUser(@RequestParam String userID){
        userRepository.deleteById(userID);
    }

    @PostMapping
    public PoolUser saveUser(@RequestBody PoolUser user){
        return userRepository.save(user);
    }
}
