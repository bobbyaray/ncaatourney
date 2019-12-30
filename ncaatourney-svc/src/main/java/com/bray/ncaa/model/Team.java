package com.bray.ncaa.model;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class Team {
    @Id
    private String id;

    private short seed;
    private boolean alive;
    private short score64;
    private short score32;
    private short score16;
    private short score8;
    private short score4;
    private short score2;
}
