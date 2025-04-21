package com.example.demo.dto;

import com.example.demo.model.User;

public class AuthResponse {
    private User user;
    private String token;

    // Constructor
    public AuthResponse(User user, String token) {
        this.user = user;
        this.token = token;
    }

    // Getters
    public User getUser() {
        return user;
    }

    public String getToken() {
        return token;
    }
}
