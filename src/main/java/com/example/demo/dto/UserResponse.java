package com.example.demo.dto;

import com.example.demo.model.User;

public class UserResponse {
    private final Long id;
    private final String firstName;
    private final String lastName;
    private final String email;
    private final String phone;

    public UserResponse(long id, String firstName, String lastName, String email, String phone){
        this.id=id;
        this.firstName=firstName;
        this.lastName=lastName;
        this.email=email;
        this.phone=phone;
    }
    public UserResponse(User user){
        this.id=user.getId();
        this.firstName=user.getFirstName();
        this.lastName=user.getLastName();
        this.email=user.getEmail();;
        this.phone=user.getPhone();
    }

    public String getFirstName(){
        return firstName;
    }
    public String getLastName(){
        return lastName;
    }
    public String getEmail(){
        return email;
    }
    public String getPhone(){
        return phone;
    }
    public long getId(){
        return id;
    }
}
