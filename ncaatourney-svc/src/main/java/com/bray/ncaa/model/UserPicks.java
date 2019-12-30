package com.bray.ncaa.model;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class UserPicks {
    @Id
    private String id;

    private String userID;
    private Long seed_01;
    private Long seed_02;
    private Long seed_03;
    private Long seed_04;
    private Long seed_05;
    private Long seed_06;
    private Long seed_07;
    private Long seed_08;
    private Long seed_09;
    private Long seed_10;
    private Long seed_11;
    private Long seed_12;
    private Long seed_13;
    private Long seed_14;
    private Long seed_15;
    private Long seed_16;
}
