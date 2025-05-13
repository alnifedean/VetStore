package com.example.demo.service;

import com.example.demo.model.User;

import java.util.List;
import java.util.Optional;

/**
 * Service interface for managing user-related operations.
 * Defines methods for user creation, retrieval, update, and deletion.
 */
public interface UserService {
    /**
     * Adds a new user to the system.
     *
     * @param user The user data to be stored.
     * @return The created User entity.
     */
    User addUser(User user);

    /**
     * Retrieves all registered users.
     *
     * @return A list of User entities.
     */
    List<User> getAllUsers();

    /**
     * Retrieves a user by their unique ID.
     *
     * @param id The ID of the user.
     * @return An Optional containing the user if found.
     */
    Optional<User> getUserById(Long id);

    /**
     * Updates an existing user's information.
     *
     * @param userId The ID of the user to be updated.
     * @param user The updated user data.
     * @return The updated User entity.
     */
    User updateUser(Long userId, User user);

    /**
     * Deletes a user from the system.
     *
     * @param userId The ID of the user to be deleted.
     */
    void deleteUser(Long userId);
}
