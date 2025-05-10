package com.example.demo.controllers;

import com.example.demo.dto.UserResponse;
import com.example.demo.model.User;
import com.example.demo.service.UserService;
import com.example.demo.utils.JWTUtil;
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

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5174")
public class UserController {

    @Autowired
    private JWTUtil jwtUtil;
    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<String> addUser(@Valid @RequestBody User user, BindingResult result){
        try {
            if (result.hasErrors()){return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid input");}

            User savedUser = userService.addUser(user);

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
            List<User> allUsers = userService.getAllUsers();
            return ResponseEntity.ok(allUsers);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUser(@PathVariable long id, @RequestHeader(value = "Authorization")String token){
        try {
            if (!jwtUtil.isValidToken(token)){return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();}
            User user = userService.getUserById(id).orElseThrow(() -> new RuntimeException("User not found..."));
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
            if (!jwtUtil.isValidToken(token)) {return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();}
            Long userId = Long.parseLong(jwtUtil.getKey(token));

            User updatedUser = userService.updateUser(userId, user);

            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.AUTHORIZATION, token);

            return new ResponseEntity<>(new UserResponse(updatedUser), headers, HttpStatus.OK);

        } catch (NumberFormatException e) {
            System.out.println("Invalid token ID format: " + e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (IllegalArgumentException e) {
            System.out.println("Email already in use: " + e);
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
    public ResponseEntity<String> deleteUser(@RequestHeader(value = "Authorization")String token){
        try {
            if (!jwtUtil.isValidToken(token)){return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();}
            long userId = Long.parseLong(jwtUtil.getKey(token));

            userService.deleteUser(userId);

            return ResponseEntity.ok().body("User deleted...");

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
