package com.bray.ncaa.model;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class PoolState {
    @Id
    private String id;

    private TourneyState state;
    private int tourneyYear;
}
