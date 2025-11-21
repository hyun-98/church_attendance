package com.example.church.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

    // 모든 경로를 React index.html로 포워딩
    @RequestMapping(value = {"/", "/attendance", "/register", "/report-create", "/stats"})
    public String forwardReactRoutes() {
        return "forward:/index.html";
    }
}
