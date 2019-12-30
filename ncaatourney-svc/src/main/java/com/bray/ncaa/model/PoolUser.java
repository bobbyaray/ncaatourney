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
    private boolean admin;
    private int score;
    private String password;
}
