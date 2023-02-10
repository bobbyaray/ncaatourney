package com.bray.ncaa.controller;

import com.bray.ncaa.model.StandingsEntry;
import com.bray.ncaa.service.StandingsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@Slf4j
@RestController
@RequestMapping("/api/standings")
public class StandingsController {
    @Autowired
    private StandingsService standingsService;

    @GetMapping
    public List<StandingsEntry> getStandings(){
        return standingsService.getStandings();
    }
}
