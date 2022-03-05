package com.bray.ncaa.controller;

import com.bray.ncaa.dao.PoolUserRepository;
import com.bray.ncaa.model.PoolUser;
import com.bray.ncaa.model.UserLogin;
import com.bray.ncaa.service.UsersService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/user")
@Slf4j
public class UserController {
    @Autowired
    private UsersService userService;

    @GetMapping("/list")
    public List<PoolUser> getAllPoolUsers(){
        return userService.getAllPoolUsers();
    }

    @GetMapping("/{userID}")
    public PoolUser getPoolUser(@PathVariable String userID){
        return userService.getPoolUser(userID);
    }

    @GetMapping("byemail")
    public PoolUser getPoolUserByEmail(@RequestParam String email){
        return userService.getPoolUserByEmail(email);
    }

    @DeleteMapping("/deleteall")
    public void deleteAllUsers(){
        userService.deleteAllUsers();
    }

    @DeleteMapping("/{userID}")
    public void deleteUser(@PathVariable String userID){
        userService.deleteUser(userID);
    }

    @PostMapping
    public PoolUser saveUser(@RequestBody PoolUser user){
        try {
            return userService.saveUser(user);
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @PostMapping("login")
    public PoolUser userLogin(@RequestBody UserLogin userLogin) {
        try {
            return userService.processUserLogin(userLogin);
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED, e.getMessage());

        }
    }
}
