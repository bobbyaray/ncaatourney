package com.bray.ncaa.model;

import lombok.Data;

import java.util.List;

@Data
public class TeamSeed {
    private int seed;
    private List<Team> teams;
}
