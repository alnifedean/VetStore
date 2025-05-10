package com.example.demo.service;

import com.example.demo.dto.UserResponse;
import com.example.demo.model.User;
import com.example.demo.respository.UserRepository;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;

public class AuthServiceImpl implements AuthService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserResponse login(User user) {

        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        User storedUser = userRepository.findByEmail(user.getEmail()).orElseThrow(() -> new RuntimeException("Invalid credentials..."));
        String hashedPassword = storedUser.getPassword();
        boolean userVerified = argon2.verify(hashedPassword, user.getPassword().toCharArray());

        if (!userVerified){throw new RuntimeException("Invalid credentials");}

        return new UserResponse(storedUser);
    }
}
