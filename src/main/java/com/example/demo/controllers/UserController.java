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

/**
 * Controller responsible for managing user operations.
 * Provides endpoints for user registration, retrieval, modification, and deletion.
 * Requires authentication via JWT token for most actions.
 */
@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5174")
public class UserController {

    /** Utility for JWT authentication and token validation. */
    @Autowired
    private JWTUtil jwtUtil;
    /** Service layer for user management operations. */
    @Autowired
    private UserService userService;

    /**
     * Registers a new user in the system.
     *
     * @param user The user data to be stored.
     * @param result Validation results for request data.
     * @return ResponseEntity containing confirmation or error status.
     */
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

    /**
     * Retrieves all registered users.
     * Requires authentication.
     *
     * @param token Authorization token from the request header.
     * @return List of all users or appropriate error status.
     */
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

    /**
     * Retrieves a specific user by ID.
     * Requires authentication.
     *
     * @param id The user ID.
     * @param token Authorization token from the request header.
     * @return The user details or an appropriate error status.
     */
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

    /**
     * Updates user information.
     * Generates a new authentication token upon successful update.
     *
     * @param user The updated user data.
     * @param token Authorization token from the request header.
     * @return Updated user details with a new authentication token or error status.
     */
    @PutMapping
    public  ResponseEntity<UserResponse> modifyUser(@RequestBody User user, @RequestHeader(value = "Authorization") String token){
        try {
            if (!jwtUtil.isValidToken(token)) {return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();}
            Long userId = Long.parseLong(jwtUtil.getKey(token));

            User updatedUser = userService.updateUser(userId, user);

            String newToken = jwtUtil.create(String.valueOf(updatedUser.getId()), updatedUser.getEmail());
            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.AUTHORIZATION, newToken);

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

    /**
     * Deletes the authenticated user from the system.
     *
     * @param token Authorization token from the request header.
     * @return Success or error status.
     */
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
