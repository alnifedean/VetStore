package com.example.demo.service;

import com.example.demo.dto.UserResponse;
import com.example.demo.model.User;

/**
 * Service interface for authentication operations.
 * Defines the method for user login.
 */
public interface AuthService {
    /**
     * Authenticates a user based on provided credentials.
     *
     * @param user The user attempting to log in.
     * @return UserResponse containing authenticated user details.
     */
    UserResponse login(User user);
}
