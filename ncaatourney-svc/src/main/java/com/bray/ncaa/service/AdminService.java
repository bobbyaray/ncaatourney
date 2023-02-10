package com.bray.ncaa.service;

import com.bray.ncaa.dao.PoolStateRepository;
import com.bray.ncaa.model.PoolState;
import com.bray.ncaa.model.TourneyState;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.security.SecureRandom;
import java.util.*;

@Service
@Slf4j
public class AdminService {
    @Autowired
    private PoolStateRepository stateRepository;

    @Autowired
    private TeamsService teamService;

    @Autowired
    private UsersService usersService;

    @Autowired
    private PoolStateService poolStateService;

    private Set<String> adminTokens;

    public void resetPool() {
        log.info("Resetting the pool.");
        usersService.deleteAllUsers();
        teamService.deleteAllTeams();
        poolStateService.resetPoolState();
    }

    /**
     * Create a token for admin access. Pretty basic security after an admin login.
     * We can enhance this in the future.
     *
     * @return
     */
    public String getAdminToken() {
        if(adminTokens == null) adminTokens = new HashSet<>();

        SecureRandom secureRandom = new SecureRandom(); //threadsafe
        Base64.Encoder base64Encoder = Base64.getUrlEncoder();
        byte[] randomBytes = new byte[24];
        secureRandom.nextBytes(randomBytes);

        String newToken = base64Encoder.encodeToString(randomBytes);
        log.info("New Admin Token generated: {}", newToken);
        adminTokens.add(newToken);
        return newToken;
    }

    public void checkAdminAccess(String t) {
        log.info("Checking access token: {}", t);
        if(!adminTokens.contains(t)) {
            log.info("Access token check failed: {}", t);
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED, "Admin token not present or invalid");
        }
    }
}
