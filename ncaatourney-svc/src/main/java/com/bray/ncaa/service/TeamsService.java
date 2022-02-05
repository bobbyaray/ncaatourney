package com.bray.ncaa.service;

import com.bray.ncaa.dao.TeamRepository;
import com.bray.ncaa.model.Team;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class TeamsService {
    @Autowired
    private TeamRepository teamRepository;

    public void addTeam(Team team) {
        validateNewTeam(team);

        log.info("Adding team: {}", team);
        teamRepository.save(team);
    }

    public void updateTeam(Team team) {
        log.info("Updating team: {}", team);
        teamRepository.save(team);
    }

    public void deleteTeam(String teamID) {
        log.info("Deleting team: {}", teamID);
        teamRepository.deleteById(teamID);
    }

    /**
     * Dangerous method. Only used by admin to reset everything.
     */
    public void deleteAllTeams() {
        log.info("Deleting all teams in the pool");
        teamRepository.deleteAll();
    }

    public Team getTeamById(String teamID) {
        return teamRepository.findById(teamID).get();
    }

    public List<Team> getAllTeams() {
        log.info("Fetching all teams");
        return teamRepository.findAll(Sort.by(Sort.Direction.ASC, "seed"));
    }

    private void validateNewTeam(Team team){
        // Validate name unique

        // Validate seed between 1-16

        // Validate that we dont already have too many teams of that seed

    }
}
