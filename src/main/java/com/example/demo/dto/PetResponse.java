package com.example.demo.dto;

import com.example.demo.model.Pet;
import com.example.demo.model.User;

/**
 * Data Transfer Object (DTO) for representing pet responses.
 * Encapsulates pet details and the associated user information.
 */
public class PetResponse {
    /** PetResponse Variables */
    private final Long id;
    private final String name;
    private final String breed;
    private final Integer ageYears;
    private final UserResponse userResponse;

    /** PetResponse Constructor */
    public PetResponse(Long id, String name, String breed, Integer ageYears, User user){
        this.id=id;
        this.name=name;
        this.breed=breed;
        this.ageYears=ageYears;
        this.userResponse=new UserResponse(user);
    }

    /** PetResponse Constructor */
    public PetResponse(Pet pet){
        this.id=pet.getId();
        this.name=pet.getName();
        this.breed=pet.getBreed();
        this.ageYears=pet.getAgeYears();
        this.userResponse=new UserResponse(pet.getUser());
    }

    /** Getters */
    public Long getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public String getBreed() {
        return breed;
    }
    public Integer getAgeYears() {
        return ageYears;
    }
    public UserResponse getUserResponse() {
        return userResponse;
    }

}
