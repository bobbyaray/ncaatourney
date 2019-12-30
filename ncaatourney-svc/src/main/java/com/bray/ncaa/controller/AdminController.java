package com.bray.ncaa.controller;

import com.bray.ncaa.dao.PoolStateRepository;
import com.bray.ncaa.model.PoolState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;

@RestController
@RequestMapping("/pool")
public class AdminController {
    @Autowired
    private PoolStateRepository stateRepository;

    @GetMapping
    public PoolState getCurrentState(){
        // There should only be one state present
        return stateRepository.findAll().get(0);
    }

    @PostMapping
    public void savePoolState(PoolState state){
        stateRepository.save(state);
    }

    @PutMapping("/reset")
    public void resetPoolState(){
        stateRepository.deleteAll();
        PoolState state = new PoolState();
        state.setTourneyYear(Calendar.getInstance().get(Calendar.YEAR));
        state.setReadyForPicks(false);
        state.setTourneyStarted(false);
    }
}
