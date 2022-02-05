package com.bray.ncaa.controller;

import com.bray.ncaa.model.Team;
import com.bray.ncaa.service.TeamsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teams")
@Slf4j
public class TeamController {
    @Autowired
    private TeamsService teamsService;

    @GetMapping("/list")
    public List<Team> getAllTeams(){
        return teamsService.getAllTeams();
    }

    @GetMapping("/{teamID}")
    public Team getTeam(@PathVariable String teamID){
        return teamsService.getTeamById(teamID);
    }

    @PostMapping
    @PutMapping
    public void saveTeam(@RequestBody Team team){
        if(team.getId() == null) {
            teamsService.addTeam(team);
        } else {
            teamsService.updateTeam(team);
        }
    }

    @DeleteMapping("/{teamID}")
    public void deleteTeam(@PathVariable String teamID){
        teamsService.deleteTeam(teamID);
    }
}
