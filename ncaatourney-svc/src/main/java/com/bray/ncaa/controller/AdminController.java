package com.bray.ncaa.controller;

import com.bray.ncaa.model.PoolState;
import com.bray.ncaa.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pool")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @GetMapping("/state")
    public PoolState getCurrentState(){
        return adminService.getCurrentState();
    }

    @PostMapping("/state")
    public void savePoolState(@RequestBody PoolState state){
        adminService.savePoolState(state);
    }

    @PutMapping("/reset")
    public void resetPoolState(){
        adminService.resetPool();
    }
}
