package com.example.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

/**
 * Represents the User entity in the database.
 * Each user has personal information such as name, email, phone, and password.
 */
@Table(name = "user")
@Entity
public class User {

    /** Unique identifier for the user */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    /** User attributes */
    @NotBlank(message = "The firs name can not be empty or null")
    @Column(length = 50)
    private String firstName;
    @NotBlank(message = "The last name can not be empty or null")
    @Column(length = 50)
    private String lastName;
    @NotBlank(message = "The email can not be empty or null")
    @Email(message = "The email need to be valid")
    @Column(length = 50)
    private String email;
    @NotBlank(message = "The phone can not be empty or null")
    @Column(length = 15)
    private String phone;
    @NotBlank(message = "The password can not be empty or null")
    @Column(length = 256)
    private String password;

    /** Constructor */
    public User(){}

    /** Constructor */
    public User(String firstName, String lastName, String email, String phone, String password){
        this.firstName=firstName;
        this.lastName=lastName;
        this.email=email;
        this.phone=phone;
        this.password=password;
    }

    /** Getters and Setters */
    public long getId() {
        return id;
    }
    public void setId(Long id){this.id=id;}

    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
}
