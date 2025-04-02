package com.example.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "petTable")
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column
    private String name;
    @NotBlank
    @Column
    private String breed;
    @NotBlank
    @Column
    private Integer ageYears;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Pet(Long id, String name, String breed, Integer ageYears) {
        this.id = id;
        this.name = name;
        this.breed = breed;
        this.ageYears = ageYears;
    }

    public Long getId() {
        return id;
    }

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
}
