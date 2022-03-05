package com.bray.ncaa.controller;

import com.bray.ncaa.dao.PoolUserRepository;
import com.bray.ncaa.dao.TeamRepository;
import com.bray.ncaa.model.PoolUser;
import com.bray.ncaa.model.StandingsEntry;
import com.bray.ncaa.model.Team;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/standings")
public class StandingsController {
    @Autowired
    private PoolUserRepository userRepository;

    @Autowired
    private TeamRepository teamRepository;

    @GetMapping
    public List<StandingsEntry> getStandings(){
        List<StandingsEntry> entries = new ArrayList<>();

        // Load all teams into a map
        List<Team> teamList = teamRepository.findAll();
        Map<String, Team> teamMap = new HashMap<>();
        teamList.stream().forEach(team -> teamMap.put(team.getId(), team));

        // Get all Users
        List<PoolUser> users = userRepository.findAll();

        // Load the users info
        users.stream().forEach(user ->{
            StandingsEntry entry = new StandingsEntry();
            entry.setRealName(user.getFirstName() + " " + user.getLastName());
            entry.setUserName(user.getDisplayName());

            List<Team> userTeams = new ArrayList<>();

            // Load teams for user
            if (user.getSeed_01() != null) userTeams.add(teamMap.get(user.getSeed_01()));
            if (user.getSeed_02() != null) userTeams.add(teamMap.get(user.getSeed_02()));
            if (user.getSeed_03() != null) userTeams.add(teamMap.get(user.getSeed_03()));
            if (user.getSeed_04() != null) userTeams.add(teamMap.get(user.getSeed_04()));
            if (user.getSeed_05() != null) userTeams.add(teamMap.get(user.getSeed_05()));
            if (user.getSeed_06() != null) userTeams.add(teamMap.get(user.getSeed_06()));
            if (user.getSeed_07() != null) userTeams.add(teamMap.get(user.getSeed_07()));
            if (user.getSeed_08() != null) userTeams.add(teamMap.get(user.getSeed_08()));
            if (user.getSeed_09() != null) userTeams.add(teamMap.get(user.getSeed_09()));
            if (user.getSeed_10() != null) userTeams.add(teamMap.get(user.getSeed_10()));
            if (user.getSeed_11() != null) userTeams.add(teamMap.get(user.getSeed_11()));
            if (user.getSeed_12() != null) userTeams.add(teamMap.get(user.getSeed_12()));
            if (user.getSeed_13() != null) userTeams.add(teamMap.get(user.getSeed_13()));
            if (user.getSeed_14() != null) userTeams.add(teamMap.get(user.getSeed_14()));
            if (user.getSeed_15() != null) userTeams.add(teamMap.get(user.getSeed_15()));
            if (user.getSeed_16() != null) userTeams.add(teamMap.get(user.getSeed_16()));

            entry.setPicks(userTeams);
            entry.setTeamsRemaining(userTeams.stream().filter(x -> x.isAlive()).collect(Collectors.toList()).size());

            int score = 0;
            for(Team team: userTeams){
                score = score + team.getTotalScore();
            }
            entry.setScore(score);

            entries.add(entry);

        });

        return entries.stream()
                .sorted(Comparator.comparing(StandingsEntry::getScore).reversed())
                .collect(Collectors.toList());
    }
}
