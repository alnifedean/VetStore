package com.example.demo.respository;

import com.example.demo.model.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Repository interface for managing Pet entity operations in the database.
 * Extends JpaRepository to provide CRUD functionality.
 */
@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {
    /**
     * Retrieves a list of pets belonging to a specific user.
     *
     * @param userId The ID of the user.
     * @return List of pets owned by the given user.
     */
    List<Pet> findByUser_Id(Long userId);
}
