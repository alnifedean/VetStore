package com.example.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

/**
 * Represents the Pet entity in the database.
 * Each pet belongs to a user and has basic attributes like name, breed, and age.
 * This class is mapped to the "pet_table" in the database.
 */
@Entity
@Table(name = "pet_table")
public class Pet {

    /** Unique identifier for the pet */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Pet attributes */
    @NotBlank
    @Column
    private String name;
    @NotBlank
    @Column
    private String breed;
    @Min(value = 1)
    @Column
    private Integer ageYears;
    /** Relationship with User entity (Each pet belongs to a user) */
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    /** Constructor */
    public Pet(){}

    /** Constructor */
    public Pet(Long id, String name, String breed, Integer ageYears) {
        this.id = id;
        this.name = name;
        this.breed = breed;
        this.ageYears = ageYears;
    }

    /** Getters and Setters */
    public Long getId() {
        return id;
    }
    public void setId(Long id){this.id=id;}

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getBreed() {
        return breed;
    }
    public void setBreed(String breed) {
        this.breed = breed;
    }

    public Integer getAgeYears() {
        return ageYears;
    }
    public void setAgeYears(Integer ageYears) {
        this.ageYears = ageYears;
    }

    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public long getUserId() {
        return user.getId();
    }
}
