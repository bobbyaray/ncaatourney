package com.bray.ncaa.controller;

import com.bray.ncaa.model.Export;
import com.bray.ncaa.model.PoolState;
import com.bray.ncaa.model.PoolUser;
import com.bray.ncaa.service.AdminService;
import com.bray.ncaa.service.PoolStateService;
import com.bray.ncaa.service.TeamsService;
import com.bray.ncaa.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public void savePoolState(@RequestBody PoolState state, @RequestHeader String t){
        adminService.checkAdminAccess(t);
        poolStateService.savePoolState(state);
    }

    @PostMapping("/reset")
    public void resetPool(@RequestHeader String t){
        adminService.checkAdminAccess(t);
        adminService.resetPool();
    }

    @GetMapping("/loginuser/{userID}")
    public PoolUser loginAsUser(@PathVariable String userID, @RequestHeader String t) {
        adminService.checkAdminAccess(t);
        return usersService.getPoolUser(userID);
    }

    @GetMapping("/export")
    public Export exportPool(@RequestHeader String t){
        adminService.checkAdminAccess(t);
        Export export = new Export();
        export.setPoolUsers(usersService.getAllPoolUsers());
        export.setState(poolStateService.getCurrentState());
        export.setTeams(teamsService.getAllTeams());

        return export;
    }
}
