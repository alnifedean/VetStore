package com.example.demo.service;

import com.example.demo.dto.PetResponse;
import com.example.demo.model.Pet;

import java.util.List;
import java.util.Optional;

/**
 * Service interface for managing pet-related operations.
 * Defines methods for creating, retrieving, updating, and deleting pets.
 */
public interface PetService {
    /**
     * Adds a new pet for a specific user.
     *
     * @param pet The pet to be added.
     * @param userId The ID of the user who owns the pet.
     * @return The saved Pet entity.
     */
    Pet addPet(Pet pet, long userId);

    /**
     * Retrieves all pets available in the system.
     *
     * @return A list of PetResponse objects containing pet details.
     */
    List<PetResponse> getAllPets();

    /**
     * Retrieves a pet by its unique ID.
     *
     * @param id The ID of the pet.
     * @return An Optional containing the pet if found.
     */
    Optional<Pet> getPetId(long id);

    /**
     * Retrieves all pets owned by a specific user.
     *
     * @param id The user's ID.
     * @return A list of PetResponse objects representing the user's pets.
     */
    List<PetResponse> getPetsByUserId(long id);

    /**
     * Updates pet information for a specific user.
     *
     * @param userId The ID of the user who owns the pet.
     * @param pet The pet entity with updated details.
     * @return The updated Pet entity.
     */
    Pet updatePet(long userId, Pet pet);

    /**
     * Deletes a pet owned by a specific user.
     *
     * @param PetId The ID of the pet to be deleted.
     * @param userId The ID of the user who owns the pet.
     */
    void deletePet(long PetId, long userId);
}
