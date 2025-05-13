package com.example.demo.service;

import com.example.demo.dto.PetResponse;
import com.example.demo.model.Pet;
import com.example.demo.model.User;
import com.example.demo.respository.PetRepository;
import com.example.demo.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

/**
 * Implementation of the PetService interface.
 * Handles CRUD operations for pet management, ensuring ownership validation.
 */
@Service
public class PetServiceImpl implements PetService {

    /** Repository for retrieving user data from the database. */
    @Autowired
    UserRepository userRepository;
    /** Repository for retrieving pet data from the database. */
    @Autowired
    PetRepository petRepository;

    /**
     * Adds a new pet and assigns it to a specific user.
     *
     * @param pet The pet to be added.
     * @param userId The ID of the user who owns the pet.
     * @return The saved Pet entity.
     * @throws RuntimeException If the user is not found.
     */
    @Override
    public Pet addPet(Pet pet, long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found..."));
        pet.setUser(user);
        petRepository.save(pet);
        return pet;
    }

    /**
     * Retrieves all pets in the system.
     *
     * @return A list of PetResponse objects containing pet details.
     */
    @Override
    public List<PetResponse> getAllPets() {
        List<Pet> pets = petRepository.findAll();
        return pets.stream()
                .map(PetResponse::new)
                .toList();
    }

    /**
     * Retrieves a pet by its unique ID.
     *
     * @param id The ID of the pet.
     * @return An Optional containing the pet if found.
     */
    @Override
    public Optional<Pet> getPetId(long id) {
        return petRepository.findById(id);
    }

    /**
     * Retrieves all pets owned by a specific user.
     *
     * @param id The user's ID.
     * @return A list of PetResponse objects representing the user's pets.
     */
    @Override
    public List<PetResponse> getPetsByUserId(long id) {

        List<Pet> pets = petRepository.findByUser_Id(id);

        return pets.stream()
                .map(PetResponse::new)
                .toList();
    }

    /**
     * Updates pet information for the authenticated user.
     *
     * @param userId The ID of the user who owns the pet.
     * @param pet The pet entity with updated details.
     * @return The updated Pet entity.
     * @throws RuntimeException If the pet does not exist or belongs to another user.
     */
    @Override
    public Pet updatePet(long userId, Pet pet) {

        Pet updatedPet = petRepository.findById(pet.getId()).orElseThrow(() -> new RuntimeException("Pet not found..."));
        if (userId!=updatedPet.getUserId()){throw new RuntimeException("You are not the owner of this pet.");}

        if (pet.getName() != null && !pet.getName().isEmpty()) {updatedPet.setName(pet.getName());}
        if (pet.getBreed() != null && !pet.getBreed().isEmpty()) {updatedPet.setBreed(pet.getBreed());}
        if (pet.getAgeYears() != null && pet.getAgeYears() > 0) {updatedPet.setAgeYears(pet.getAgeYears());}

        petRepository.save(updatedPet);

        return updatedPet;
    }

    /**
     * Deletes a pet from the system, ensuring the requesting user is the owner.
     *
     * @param petId The ID of the pet to be deleted.
     * @param userId The ID of the user who owns the pet.
     * @throws RuntimeException If the pet does not exist or belongs to another user.
     */
    @Override
    public void deletePet(long petId, long userId) {
        Pet deletedPet = petRepository.findById(petId).orElseThrow(() -> new RuntimeException("Pet not found..."));
        if(userId!=deletedPet.getUserId()){throw new RuntimeException("You are not the owner of this pet.");}

        petRepository.delete(deletedPet);
    }
}
