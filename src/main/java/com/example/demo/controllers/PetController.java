package com.example.demo.controllers;

import com.example.demo.model.Pet;
import com.example.demo.model.User;
import com.example.demo.respository.PetRepository;
import com.example.demo.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/pet")
public class PetController {

    @Autowired
    PetRepository petRepository;
    @Autowired
    UserRepository userRepository;

    @PostMapping("/{id}")
    public ResponseEntity<Pet> addPet(@RequestBody Pet pet, @PathVariable Long id){
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found..."));
        pet.setUser(user);
        petRepository.save(pet);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{pet}")
                .buildAndExpand(pet.getName())
                .toUri();

        return ResponseEntity.created(location).body(pet);
    }

    @GetMapping
    public List<Pet> getAllPets(){
        if(petRepository.findAll().isEmpty()){throw new RuntimeException("No pets");}
        return petRepository.findAll();
    }

    @GetMapping("/{id}")
    public Pet getPet(@PathVariable Long id){
        return petRepository.findById(id).orElseThrow(() -> new RuntimeException("Pet not found..."));
    }

    @PutMapping
    public Pet modifyPet(@RequestBody Pet pet){
        Pet updatedPet = petRepository.findById(pet.getId()).orElseThrow(() -> new RuntimeException("Pet not found..."));
        updatedPet.setName(pet.getName());
        updatedPet.setBreed(pet.getBreed());
        updatedPet.setAgeYears(pet.getAgeYears());
        petRepository.save(updatedPet);
        return updatedPet;
    }

    @PatchMapping
    public Pet updatePetPartial(@RequestBody Pet pet){
        Pet updatedPet = petRepository.findById(pet.getId()).orElseThrow(() -> new RuntimeException("User not found..."));
        boolean change = false;

        if(!pet.getName().isEmpty() && pet.getName() != null){
            updatedPet.setName(pet.getName());
            change=true;}
        if(!pet.getBreed().isEmpty() && pet.getBreed() != null){
            updatedPet.setBreed(pet.getBreed());
            change=true;}
        if(pet.getAgeYears()<1 && pet.getAgeYears() != null){
            updatedPet.setAgeYears(pet.getAgeYears());
            change=true;}

        if(change){
            petRepository.save(updatedPet);
            return updatedPet;
        } else {throw new RuntimeException("All fields are empty or invalid...");}
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePet(@PathVariable Long id){
        Pet deletedPet = petRepository.findById(id).orElseThrow(() -> new RuntimeException("Pet not found..."));
        petRepository.delete(deletedPet);
        return ResponseEntity.ok("Pet deleted...");
    }
}
