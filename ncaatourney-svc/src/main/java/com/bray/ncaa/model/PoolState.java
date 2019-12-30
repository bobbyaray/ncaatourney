package com.bray.ncaa.model;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class PoolState {
    @Id
    private String id;

    private boolean tourneyStarted = false;
    private boolean readyForPicks = false;
    private int tourneyYear;
}
