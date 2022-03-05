package com.bray.ncaa.controller;

import com.bray.ncaa.model.Team;
import com.bray.ncaa.model.TeamSeed;
import com.bray.ncaa.service.TeamsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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

    @GetMapping("/groupbyseed")
    public List<TeamSeed> groupTeamsBySeed() {
        List<TeamSeed> seedTeams = new ArrayList<>();
        for(int i = 1; i < 17; i++) {
            TeamSeed teamSeed = new TeamSeed();
            teamSeed.setSeed(i);
            teamSeed.setTeams(new ArrayList<>());
            seedTeams.add(teamSeed);
        }

        List<Team> allTeams = teamsService.getAllTeams();

        for(Team team: allTeams) {
            List<Team> teams = seedTeams.get(team.getSeed()-1).getTeams();
            teams.add(team);
            seedTeams.get(team.getSeed()-1).setTeams(teams);
        }

        return seedTeams;
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
