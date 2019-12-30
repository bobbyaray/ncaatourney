package com.bray.ncaa.controller;

import com.bray.ncaa.dao.TeamRepository;
import com.bray.ncaa.model.Team;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teams")
public class TeamController {
    @Autowired
    private TeamRepository teamRepository;

    @GetMapping("/list")
    public List<Team> getAllTeams(){
        return teamRepository.findAll();
    }

    @GetMapping
    public Team getTeam(String teamID){
        return teamRepository.findById(teamID).get();
    }

    @PostMapping
    @PutMapping
    public void saveTeam(@RequestBody Team team){
        teamRepository.save(team);
    }

    @DeleteMapping
    public void deleteTeam(Team team){
        teamRepository.delete(team);
    }

    @DeleteMapping("/deleteall")
    public void deleteAllTeams(){
        teamRepository.deleteAll();
    }

}
