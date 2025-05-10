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

@Service
public class PetServiceImpl implements PetService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    PetRepository petRepository;

    @Override
    public Pet addPet(Pet pet, long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found..."));
        pet.setUser(user);
        petRepository.save(pet);
        return pet;
    }

    @Override
    public List<PetResponse> getAllPets() {
        List<Pet> pets = petRepository.findAll();
        return pets.stream()
                .map(PetResponse::new)
                .toList();
    }

    @Override
    public Optional<Pet> getPetId(long id) {
        return petRepository.findById(id);
    }

    @Override
    public List<PetResponse> getPetsByUserId(long id) {

        List<Pet> pets = petRepository.findByUser_Id(id);

        return pets.stream()
                .map(PetResponse::new)
                .toList();
    }

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

    @Override
    public void deletePet(long petId, long userId) {
        Pet deletedPet = petRepository.findById(petId).orElseThrow(() -> new RuntimeException("Pet not found..."));
        if(userId!=deletedPet.getUserId()){throw new RuntimeException("You are not the owner of this pet.");}

        petRepository.delete(deletedPet);
    }
}
