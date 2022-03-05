package com.bray.ncaa.model;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class PoolUser {
    @Id
    private String id;

    private String email;
    private String firstName;
    private String lastName;
    private String displayName;
    private String password;

    private String seed_01;
    private String seed_02;
    private String seed_03;
    private String seed_04;
    private String seed_05;
    private String seed_06;
    private String seed_07;
    private String seed_08;
    private String seed_09;
    private String seed_10;
    private String seed_11;
    private String seed_12;
    private String seed_13;
    private String seed_14;
    private String seed_15;
    private String seed_16;
}
