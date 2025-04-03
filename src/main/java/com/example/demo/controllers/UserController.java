package com.example.demo.controllers;

import com.example.demo.model.User;
import com.example.demo.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5174")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<User> addUser(@RequestBody User user){
        userRepository.save(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{user}")
                .buildAndExpand(user.getFirstName())
                .toUri();

        return ResponseEntity.created(location).body(user);
    }

    @GetMapping
    public List<User> getAllUsers(){
        if(userRepository.findAll().isEmpty()){throw new RuntimeException("No users...");}
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable long id){
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found..."));
    }

    @PutMapping
    public User modifyUser(@RequestBody User user){
        User updatedUser = userRepository.findById(user.getId()).orElseThrow(() -> new RuntimeException("User not found..."));
        updatedUser.setFirstName(user.getFirstName());
        updatedUser.setLastName(user.getLastName());
        updatedUser.setEmail(user.getEmail());
        updatedUser.setPhone(user.getPhone());
        updatedUser.setPassword(user.getPassword());
        userRepository.save(updatedUser);
        return updatedUser;
    }

    @PatchMapping
    public User updateUserPartial(@RequestBody User user){
        User updatedUser = userRepository.findById(user.getId()).orElseThrow(() -> new RuntimeException("User not found..."));
        boolean change = false;

        if(!user.getFirstName().isEmpty() && user.getFirstName() != null){
            updatedUser.setFirstName(user.getFirstName());
            change=true;}
        if(!user.getLastName().isEmpty() && user.getLastName() != null){
            updatedUser.setLastName(user.getLastName());
            change=true;}
        if(!user.getEmail().isEmpty() && user.getEmail() != null){
            updatedUser.setEmail(user.getEmail());
            change=true;}
        if(!user.getPhone().isEmpty() && user.getPhone() != null){
            updatedUser.setPhone(user.getPhone());
            change=true;}
        if(!user.getPassword().isEmpty() && user.getPassword() != null){
            updatedUser.setPassword(user.getPassword());
            change=true;}

        if(change){
            userRepository.save(updatedUser);
        return updatedUser;
        } else {throw new RuntimeException("All fields are empty or invalid...");}
    }

    @DeleteMapping("/{id}")
    public User deleteUser(@PathVariable long id){
        User deletedUser = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found..."));
        userRepository.delete(deletedUser);
        return deletedUser;
    }
}
