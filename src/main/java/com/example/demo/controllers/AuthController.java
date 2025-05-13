package com.example.demo.controllers;

import com.example.demo.dto.UserResponse;
import com.example.demo.model.User;
import com.example.demo.service.AuthService;
import com.example.demo.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Authentication controller responsible for handling user login requests.
 * Generates a JWT token upon successful authentication.
 */
@RestController
public class AuthController {

    /** Utility class for handling JWT operations. */
    @Autowired
    private JWTUtil jwtUtil;

    /** Service layer for authentication logic. */
    @Autowired
    AuthService authService;

    /**
     * Handles user login requests.
     * Validates input credentials, authenticates the user, and returns a JWT token.
     *
     * @param user The user credentials (email and password).
     * @return ResponseEntity with user details and JWT token, or an error status.
     */
    @PostMapping(value = "/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            if (user.getEmail() == null || user.getEmail().isEmpty() || user.getPassword() == null || user.getPassword().isEmpty()) {return ResponseEntity.badRequest().body("Invalid Input");}

            UserResponse storedUser = authService.login(user);

            String token = jwtUtil.create(String.valueOf(storedUser.getId()), storedUser.getEmail());

            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.AUTHORIZATION, token);
            return new ResponseEntity<>(storedUser, headers, HttpStatus.OK);

        } catch (RuntimeException e) {
            System.out.println("No User found: "+e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid credentials");
        } catch (Exception e) {
            System.out.println("Unexpected error: "+e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error");
        }
    }
}



