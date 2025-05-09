package com.example.demo.service;

import com.example.demo.dto.PetResponse;
import com.example.demo.model.Pet;

import java.util.List;
import java.util.Optional;

public interface PetService {
    Pet addPet(Pet pet, long userId);
    List<PetResponse> getAllPets();
    Optional<Pet> getPetId(long id);
    List<PetResponse> getPetsByUserId(long id);
    Pet updatePet(long userId, Pet pet);
    void deletePet(long PetId, long userId);
}
