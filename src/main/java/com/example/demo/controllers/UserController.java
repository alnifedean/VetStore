package com.example.demo.controllers;

import com.example.demo.dto.UserResponse;
import com.example.demo.model.User;
import com.example.demo.respository.UserRepository;
import com.example.demo.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5174")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    JWTUtil jwtUtil;

    @PostMapping
    public ResponseEntity<String> addUser(@Valid @RequestBody User user, BindingResult result){
        try {
            if (result.hasErrors()){return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid input");}

            boolean existingEmail = userRepository.findByEmail(user.getEmail()).isPresent();
            if (existingEmail) {return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Existing email");}

            Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
            String hashedPassword = argon2.hash(1, 1024, 1, user.getPassword().toCharArray());
            user.setPassword(hashedPassword);

            userRepository.save(user);

            URI location = ServletUriComponentsBuilder
                    .fromCurrentRequest()
                    .path("/{id}")
                    .buildAndExpand(user.getId())
                    .toUri();

            return ResponseEntity.created(location).body("User created!!!");
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Database constraint violated");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid argument: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error: "+e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error");
        }
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers(@RequestHeader(value = "Authorization")String token){
        try {
            if (!jwtUtil.isValidToken(token)){return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();}
            List<User> allUsers = userRepository.findAll();
            return ResponseEntity.ok(allUsers);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUser(@PathVariable long id, @RequestHeader(value = "Authorization")String token){
        try {
            if (!jwtUtil.isValidToken(token)){return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();}
            User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found..."));
            return ResponseEntity.ok(new UserResponse(user));
        } catch (RuntimeException e){
            System.out.println("User does not exist: "+e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e){
            System.out.println("Unexpected error: "+e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @PutMapping
    public  ResponseEntity<UserResponse> modifyUser(@RequestBody User user, @RequestHeader(value = "Authorization") String token){
        try {
            if (!jwtUtil.isValidToken(token)){return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();}

            long userId = Long.parseLong(jwtUtil.getKey(token));

            User updatedUser = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found..."));

            if (user.getFirstName()!=null && !user.getFirstName().isEmpty()){updatedUser.setFirstName(user.getFirstName());}
            if (user.getLastName()!=null && !user.getLastName().isEmpty()){updatedUser.setLastName(user.getLastName());}
            if (user.getEmail()!=null && !user.getEmail().isEmpty()){
                Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
                if (existingUser.isPresent() && existingUser.get().getId() != userId){return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();}
                updatedUser.setEmail(user.getEmail());
            }
            if (user.getPhone()!=null && !user.getPhone().isEmpty()){updatedUser.setPhone(user.getPhone());}

            if (user.getPassword()!=null && !user.getPassword().isEmpty()){
            Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
            String hashedPassword = argon2.hash(1, 1024, 1, user.getPassword().toCharArray());
            updatedUser.setPassword(hashedPassword);}

            userRepository.save(updatedUser);

            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.AUTHORIZATION, token);
            return new ResponseEntity<>(new UserResponse(updatedUser), headers, HttpStatus.OK);

        } catch (NumberFormatException e) {
            System.out.println("Invalid token ID format: " + e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (IllegalArgumentException e) {
            System.out.println("Invalid argument: " + e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (RuntimeException e){
            System.out.println("User does not exist: "+e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e){
            System.out.println("Unexpected error: "+e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping
    public ResponseEntity<UserResponse> deleteUser(@RequestHeader(value = "Authorization")String token){
        try {
            if (!jwtUtil.isValidToken(token)){return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();}
            long userId = Long.parseLong(jwtUtil.getKey(token));
            User deletedUser = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found..."));

            if (deletedUser.getId()!=userId){return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();}
            userRepository.delete(deletedUser);
            return ResponseEntity.ok(new UserResponse(deletedUser));

        } catch (NumberFormatException e) {
            System.out.println("Invalid token ID format: " + e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (IllegalArgumentException e) {
            System.out.println("Invalid argument: " + e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (RuntimeException e){
            System.out.println("User does not exist: "+e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e){
            System.out.println("Unexpected error: "+e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
