package com.bray.ncaa.controller;

import com.bray.ncaa.dao.UserPicksRepository;
import com.bray.ncaa.model.UserPicks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/picks")
public class UserPicksController {
    @Autowired
    private UserPicksRepository picksRepository;

    @PostMapping
    public void saveUserPicks(@RequestBody UserPicks picks){
        picksRepository.save(picks);
    }

    @GetMapping
    public UserPicks getUserPicks(@RequestParam String userID){
        return picksRepository.findByUserID(userID);
    }

    @DeleteMapping("/deleteall")
    public void deleteAllPicks(){
        picksRepository.deleteAll();
    }
}
