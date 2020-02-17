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
        System.out.println("Saving picks for: " + picks.getUserID());
        picksRepository.save(picks);
    }

    @GetMapping
    public UserPicks getUserPicks(@RequestParam String userID){
        System.out.println("Getting user picks for: " + userID);
        return picksRepository.findByUserID(userID);
    }

    @DeleteMapping("/deleteall")
    public void deleteAllPicks(){
        picksRepository.deleteAll();
    }
}
