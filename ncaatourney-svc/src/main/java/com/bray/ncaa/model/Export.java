package com.bray.ncaa.model;

import lombok.Data;

import java.util.List;

@Data
public class Export {
    private PoolState state;
    private List<PoolUser> poolUsers;
    private List<Team> teams;
}
