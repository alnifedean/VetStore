package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.respository.UserRepository;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

/**
 * Implementation of the UserService interface.
 * Handles CRUD operations for user management, including authentication security.
 */
@Service
public class UserServiceImpl implements UserService {

    /** Repository for retrieving user data from the database. */
    @Autowired
    private UserRepository userRepository;

    /**
     * Adds a new user to the system.
     * Ensures email uniqueness and securely hashes the password using Argon2.
     *
     * @param user The user to be added.
     * @return The saved User entity.
     * @throws IllegalArgumentException If the email is already in use.
     */
    @Override
    public User addUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {throw new IllegalArgumentException("Existing email");}

        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hashedPassword = argon2.hash(1, 1024, 1, user.getPassword().toCharArray());
        user.setPassword(hashedPassword);
        return userRepository.save(user);
    }

    /**
     * Retrieves all registered users in the system.
     *
     * @return A list of User entities.
     */
    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Retrieves a user by their unique ID.
     *
     * @param id The ID of the user.
     * @return An Optional containing the user if found.
     */
    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    /**
     * Updates an existing user's information.
     * Ensures email uniqueness and securely updates the password if changed.
     *
     * @param userId The ID of the user to be updated.
     * @param user The updated user data.
     * @return The updated User entity.
     * @throws RuntimeException If the user does not exist.
     * @throws IllegalArgumentException If the email is already in use by another user.
     */
    @Override
    public User updateUser(Long userId, User user) {
        User updatedUser = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getFirstName() != null && !user.getFirstName().isEmpty()) {updatedUser.setFirstName(user.getFirstName());}
        if (user.getLastName() != null && !user.getLastName().isEmpty()) {updatedUser.setLastName(user.getLastName());}

        if (user.getEmail() != null && !user.getEmail().isEmpty()) {
            Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
            if (existingUser.isPresent() && existingUser.get().getId() != userId) {
                throw new IllegalArgumentException("Email already in use");}
            updatedUser.setEmail(user.getEmail());}

        if (user.getPhone() != null && !user.getPhone().isEmpty()) {updatedUser.setPhone(user.getPhone());}

        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
            String hashedPassword = argon2.hash(1, 1024, 1, user.getPassword().toCharArray());
            updatedUser.setPassword(hashedPassword);
        }

        return userRepository.save(updatedUser);
    }

    /**
     * Deletes a user from the system.
     *
     * @param userId The ID of the user to be deleted.
     * @throws RuntimeException If the user does not exist.
     */
    @Override
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        userRepository.delete(user);
    }
}
