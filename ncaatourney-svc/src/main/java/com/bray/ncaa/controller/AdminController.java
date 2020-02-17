package com.bray.ncaa.controller;

import com.bray.ncaa.dao.PoolStateRepository;
import com.bray.ncaa.model.PoolState;
import com.bray.ncaa.model.TourneyState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.List;

@RestController
@RequestMapping("/pool")
public class AdminController {
    @Autowired
    private PoolStateRepository stateRepository;

    @GetMapping
    public PoolState getCurrentState(){
        // There should only be one state present
        List<PoolState> state =  stateRepository.findAll();
        if(state == null || state.size() == 0) return resetPoolState();
        else return state.get(0);
    }

    @PostMapping
    public void savePoolState(@RequestBody PoolState state){
        System.out.println("Received: " + state.toString());
        stateRepository.save(state);
    }

    @PutMapping("/reset")
    public PoolState resetPoolState(){
        stateRepository.deleteAll();
        PoolState state = new PoolState();
        state.setTourneyYear(Calendar.getInstance().get(Calendar.YEAR));
        state.setState(TourneyState.ADMIN_PICKS);
        stateRepository.save(state);
        return state;
    }
}
