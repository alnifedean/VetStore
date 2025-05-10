package com.example.demo.service;

import com.example.demo.dto.UserResponse;
import com.example.demo.model.User;

public interface AuthService {
    UserResponse login(User user);
}
