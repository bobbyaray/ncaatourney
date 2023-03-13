package com.bray.ncaa.service;

import com.bray.ncaa.dao.TeamRepository;
import com.bray.ncaa.model.Team;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class TeamsService {
    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private StandingsService standingsService;

    public void addTeam(Team team) {
        validateNewTeam(team);

        log.info("Adding team: {}", team);
        teamRepository.save(team);
    }

    public void updateTeam(Team team) {
        log.info("Updating team: {}", team);
        teamRepository.save(team);
        standingsService.updateStandings();
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
        List<Team> allTeams = getAllTeams();

        // Validate name unique
        Optional<Team> existingTeam = allTeams.stream().filter(t -> t.getName().equals(team.getName())).findAny();
        if (existingTeam.isPresent()) {
            log.error("Team name {} is already taken by another team.", team.getName());
            throw new RuntimeException("Team name: " + team.getName() + " is already taken by another team");
        }

        // Validate seed between 1-16
        if (team.getSeed() < 1 || team.getSeed() > 16) {
            log.error("Invalid team seed provided: {}", team.getSeed());
            throw new RuntimeException("Invalid team seed: " + team.getSeed());
        }

        // Validate that we dont already have too many teams of that seed
        List<Team> seedTeams = allTeams.stream().filter(
                t -> t.getSeed() == team.getSeed()).collect(Collectors.toList());

        if (seedTeams.size() >= 4) {
            log.error("There are already 4 teams with seed {}", team.getSeed());
            throw new RuntimeException("There are already 4 teams with seed " + team.getSeed());
        }

    }
}
