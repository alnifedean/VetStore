package com.example.demo.controllers;

import com.example.demo.model.User;
import com.example.demo.dto.AuthResponse;
import com.example.demo.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.Optional;

@RestController
public class AuthController {

    @Autowired
    UserRepository userRepository;

    @PostMapping(value = "/login")
    public ResponseEntity<Object> login(@RequestBody User user) {
        if (user.getEmail() == null || user.getEmail().isEmpty() ||
                user.getPassword() == null || user.getPassword().isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid Input");
        }
        Optional<User> optionalUser = userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword());

        if (optionalUser.isPresent()) {
            User authUser = optionalUser.get();
            return ResponseEntity.ok(new AuthResponse(authUser, "fixed-token-12345"));
        }
        return ResponseEntity.status(401).body("FAIL");
    }




}



