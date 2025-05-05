package com.example.demo.controllers;

import com.example.demo.model.User;
import com.example.demo.respository.UserRepository;
import com.example.demo.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JWTUtil jwtUtil;

    @PostMapping(value = "/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            if (user.getEmail() == null || user.getEmail().isEmpty() || user.getPassword() == null || user.getPassword().isEmpty()) {
                return ResponseEntity.badRequest().body("Invalid Input");
            }

            Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
            User storagedUser = userRepository.findByEmail(user.getEmail()).orElseThrow(() -> new RuntimeException("Invalid credentials..."));
            String hashedPassword = storagedUser.getPassword();
            boolean userVerified = argon2.verify(hashedPassword, user.getPassword().toCharArray());

            if (userVerified){
                String token = jwtUtil.create(String.valueOf(storagedUser.getId()), storagedUser.getEmail());

                HttpHeaders headers = new HttpHeaders();
                headers.set(HttpHeaders.AUTHORIZATION, token);
                return new ResponseEntity<>(storagedUser, headers, HttpStatus.OK);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }

        } catch (RuntimeException e) {
            System.out.println("No User found: "+e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid credentials");
        } catch (Exception e) {
            System.out.println("Unexpected error: "+e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error");
        }
    }
}



