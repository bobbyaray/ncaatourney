package com.bray.ncaa.controller;

import com.bray.ncaa.dao.PoolUserRepository;
import com.bray.ncaa.dao.TeamRepository;
import com.bray.ncaa.dao.UserPicksRepository;
import com.bray.ncaa.model.PoolUser;
import com.bray.ncaa.model.StandingsEntry;
import com.bray.ncaa.model.Team;
import com.bray.ncaa.model.UserPicks;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/standings")
public class StandingsController {
    @Autowired
    private UserPicksRepository picksRepository;

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
            entry.setScore(user.getScore());
            UserPicks picks = picksRepository.findByUserID(user.getId());

            if(picks != null) {
                List<Team> userTeams = new ArrayList<>();

                // Load teams for user
                if (picks.getSeed_01() != null) userTeams.add(teamMap.get(picks.getSeed_01()));
                if (picks.getSeed_02() != null) userTeams.add(teamMap.get(picks.getSeed_02()));
                if (picks.getSeed_03() != null) userTeams.add(teamMap.get(picks.getSeed_03()));
                if (picks.getSeed_04() != null) userTeams.add(teamMap.get(picks.getSeed_04()));
                if (picks.getSeed_05() != null) userTeams.add(teamMap.get(picks.getSeed_05()));
                if (picks.getSeed_06() != null) userTeams.add(teamMap.get(picks.getSeed_06()));
                if (picks.getSeed_07() != null) userTeams.add(teamMap.get(picks.getSeed_07()));
                if (picks.getSeed_08() != null) userTeams.add(teamMap.get(picks.getSeed_08()));
                if (picks.getSeed_09() != null) userTeams.add(teamMap.get(picks.getSeed_09()));
                if (picks.getSeed_10() != null) userTeams.add(teamMap.get(picks.getSeed_10()));
                if (picks.getSeed_11() != null) userTeams.add(teamMap.get(picks.getSeed_11()));
                if (picks.getSeed_12() != null) userTeams.add(teamMap.get(picks.getSeed_12()));
                if (picks.getSeed_13() != null) userTeams.add(teamMap.get(picks.getSeed_13()));
                if (picks.getSeed_14() != null) userTeams.add(teamMap.get(picks.getSeed_14()));
                if (picks.getSeed_15() != null) userTeams.add(teamMap.get(picks.getSeed_15()));
                if (picks.getSeed_16() != null) userTeams.add(teamMap.get(picks.getSeed_16()));

                entry.setPicks(userTeams);
                entry.setTeamsRemaining(userTeams.stream().filter(x -> x.isAlive()).collect(Collectors.toList()).size());

                int score = 0;
                for(Team team: userTeams){
                    score = score + team.getScore64() + team.getScore32() + team.getScore16() + team.getScore8() + team.getScore4() + team.getScore2();
                }
                entry.setScore(score);

                entries.add(entry);
            }
        });

        return entries.stream()
                .sorted(Comparator.comparing(StandingsEntry::getScore).reversed())
                .collect(Collectors.toList());
    }
}
