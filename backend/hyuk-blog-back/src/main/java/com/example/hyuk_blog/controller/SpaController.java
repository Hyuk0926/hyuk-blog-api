package com.example.hyuk_blog.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaController {
    
    // Vue SPA 라우팅을 위한 컨트롤러
    // 모든 SPA 경로에서 index.html을 반환하여 Vue 라우터가 처리하도록 함
    
    @GetMapping("/user/login")
    public String userLogin() {
        return "index";
    }
    
    @GetMapping("/user/register")
    public String userRegister() {
        return "index";
    }
    
    @GetMapping("/admin/login")
    public String adminLogin() {
        return "index";
    }
    
    @GetMapping("/admin/dashboard")
    public String adminDashboard() {
        return "index";
    }
} 