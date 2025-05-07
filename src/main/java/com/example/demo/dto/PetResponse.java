package com.example.demo.dto;

import com.example.demo.model.Pet;
import com.example.demo.model.User;

public class PetResponse {

    private final Long id;
    private final String name;
    private final String breed;
    private final Integer ageYears;
    private final  UserResponse userResponse;

    public PetResponse(Long id, String name, String breed, Integer ageYears, User user){
        this.id=id;
        this.name=name;
        this.breed=breed;
        this.ageYears=ageYears;
        this.userResponse=new UserResponse(user);
    }

    public PetResponse(Pet pet){
        this.id=pet.getId();
        this.name=pet.getName();
        this.breed=pet.getBreed();
        this.ageYears=pet.getAgeYears();
        this.userResponse=new UserResponse(pet.getUser());
    }

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
