package com.bray.ncaa.service;

import com.bray.ncaa.dao.PoolStateRepository;
import com.bray.ncaa.model.PoolState;
import com.bray.ncaa.model.TourneyState;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.List;

@Service
@Slf4j
public class PoolStateService {
    @Autowired
    private PoolStateRepository stateRepository;

    public void savePoolState(PoolState state){
        PoolState currentState = this.getCurrentState();
        currentState.setState(state.getState());
        currentState.setTourneyYear(state.getTourneyYear());

        log.info("Saving pool state: " + currentState.toString());
        stateRepository.save(currentState);
    }

    public PoolState getCurrentState() {
        // There should only be one state present
        List<PoolState> state =  stateRepository.findAll();
        if(state == null || state.size() == 0) return resetPoolState();
        else return state.get(0);
    }

    public PoolState resetPoolState() {
        stateRepository.deleteAll();
        PoolState state = new PoolState();
        state.setTourneyYear(Calendar.getInstance().get(Calendar.YEAR));
        state.setState(TourneyState.ADMIN_PICKS);
        stateRepository.save(state);
        return state;
    }
}
