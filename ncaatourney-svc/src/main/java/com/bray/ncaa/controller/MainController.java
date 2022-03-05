package com.bray.ncaa.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {
    @RequestMapping(value={"/",
            "home",
            "/admin",
            "/login",
            "/register",
            "/tourney",
            "/useraccount/*",
            "/teamupdate/*"})
    public String mainPage(){
        return "forward:/index.html";
    }
}
