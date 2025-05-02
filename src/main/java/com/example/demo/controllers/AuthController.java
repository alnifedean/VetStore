package com.example.demo.controllers;

import com.example.demo.model.User;
import com.example.demo.dto.AuthResponse;
import com.example.demo.respository.UserRepository;
import com.example.demo.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.Optional;

@RestController
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JWTUtil jwtUtil;

    @PostMapping(value = "/login")
    public ResponseEntity<Object> login(@RequestBody User user) {
        if (user.getEmail() == null || user.getEmail().isEmpty() ||
                user.getPassword() == null || user.getPassword().isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid Input");
        }

        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());

        if (optionalUser.isPresent()) {
            User authUser = optionalUser.get();
            String hashedPassword = authUser.getPassword();
            boolean userVerified = argon2.verify(hashedPassword, user.getPassword().toCharArray());

            if (userVerified){

                String token = jwtUtil.create(String.valueOf(authUser.getId()), authUser.getEmail());

                return ResponseEntity.ok(new AuthResponse(authUser, token));
            } else {
                return ResponseEntity.status(401).body("FAIL");
            }


        }
        return ResponseEntity.status(401).body("FAIL");
    }
}



