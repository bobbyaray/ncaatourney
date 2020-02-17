package com.bray.ncaa.controller;

import com.bray.ncaa.dao.TeamRepository;
import com.bray.ncaa.model.Team;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teams")
@Slf4j
public class TeamController {
    @Autowired
    private TeamRepository teamRepository;

    @GetMapping("/list")
    public List<Team> getAllTeams(){
        return teamRepository.findAll(Sort.by(Sort.Direction.ASC, "seed"));
    }

    @GetMapping
    public Team getTeam(@RequestParam String teamID){
        System.out.println("Getting team: " + teamID);
        return teamRepository.findById(teamID).get();
    }

    @PostMapping
    @PutMapping
    public void saveTeam(@RequestBody Team team){
        teamRepository.save(team);
    }

    @DeleteMapping
    public void deleteTeam(@RequestParam String teamID){
        log.info("Deleting team: {}", teamID);
        teamRepository.deleteById(teamID);
    }

    @DeleteMapping("/deleteall")
    public void deleteAllTeams(){
        teamRepository.deleteAll();
    }

}
