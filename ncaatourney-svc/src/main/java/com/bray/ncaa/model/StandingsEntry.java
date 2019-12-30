package com.bray.ncaa.model;

import lombok.Data;

import java.util.List;

@Data
public class StandingsEntry {
    private String userName;
    private String realName;
    private int score;
    private int teamsRemaining;
    private List<Team> picks;
}
