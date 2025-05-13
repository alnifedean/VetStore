package com.example.demo.respository;

import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

/**
 * Repository interface for managing User entity operations in the database.
 * Extends JpaRepository to provide standard CRUD functionality.
 */
@Repository
public interface UserRepository extends JpaRepository <User, Long> {
    /**
     * Finds a user by email and password.
     * Used for authentication purposes.
     *
     * @param email User's email.
     * @param password User's password.
     * @return Optional containing the found user or empty if not found. */
    Optional<User> findByEmailAndPassword(String email, String password);

    /**
     * Finds a user by email.
     * Used for validation and authentication checks.
     *
     * @param email User's email.
     * @return Optional containing the found user or empty if not found. */
    Optional<User> findByEmail(String email);
}
