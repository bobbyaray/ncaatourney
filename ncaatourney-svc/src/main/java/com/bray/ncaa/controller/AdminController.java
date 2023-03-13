package com.bray.ncaa.controller;

import com.bray.ncaa.model.Export;
import com.bray.ncaa.model.PoolState;
import com.bray.ncaa.model.PoolUser;
import com.bray.ncaa.model.Team;
import com.bray.ncaa.service.AdminService;
import com.bray.ncaa.service.PoolStateService;
import com.bray.ncaa.service.TeamsService;
import com.bray.ncaa.service.UsersService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/pool")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @Autowired
    private UsersService usersService;

    @Autowired
    private TeamsService teamsService;

    @Autowired
    private PoolStateService poolStateService;

    @GetMapping("/state")
    public PoolState getCurrentState(){
        return poolStateService.getCurrentState();
    }

    @PostMapping("/state")
    public void savePoolState(@RequestBody PoolState state,
                              @RequestHeader String t){
        adminService.checkAdminAccess(t);
        poolStateService.savePoolState(state);
    }

    @PostMapping("/reset")
    public void resetPool(@RequestHeader String t){
        adminService.checkAdminAccess(t);
        adminService.resetPool();
    }

    @GetMapping("/loginuser/{userID}")
    public PoolUser loginAsUser(@PathVariable String userID,
                                @RequestHeader String t) {
        adminService.checkAdminAccess(t);
        return usersService.getPoolUser(userID);
    }

    @GetMapping("/export")
    public Export exportPool(@RequestHeader String t){
        adminService.checkAdminAccess(t);
        Export export = new Export();
        export.setPoolUsers(usersService.getAllPoolUsers());

        // Simple hiding of password in export. Potentially replace this with encryption.
        for (PoolUser user: export.getPoolUsers()) {
            String base64pw = Base64.getEncoder().encodeToString(user.getPassword().getBytes());
            user.setPassword(base64pw);
        }
        export.setState(poolStateService.getCurrentState());
        export.setTeams(teamsService.getAllTeams());

        return export;
    }

    @PostMapping("/import")
    public void importPool(@RequestHeader String t,
                           @RequestBody Export exportedPool) {
        adminService.checkAdminAccess(t);

        // Check if pool is already populated. If so deny import.
        List<PoolUser> users = usersService.getAllPoolUsers();
        if (!ObjectUtils.isEmpty(users)) {
            log.error("Users exist in this pool. Please reset the pool before importing.");
            throw new RuntimeException("Please reset the pool before importing.");
        }

        // Check for teams
        List<Team> teams = teamsService.getAllTeams();
        if (!ObjectUtils.isEmpty(teams)) {
            log.error("Teams exist in this pool. Please reset the pool before importing.");
            throw new RuntimeException("Please reset the pool before importing.");
        }

        // Create the teams
        for (Team team: exportedPool.getTeams()) {
            teamsService.addTeam(team);
        }

        // Create the users
        for (PoolUser user: exportedPool.getPoolUsers()) {
            // Decode the previously encoded password
            String password = new String(Base64.getDecoder().decode(user.getPassword()));
            user.setPassword(password);
            user.setId(null); // Generate new id for users
            usersService.saveUser(user);
        }

        // Set the state and year of the tournament
        savePoolState(exportedPool.getState(), t);
    }


}
