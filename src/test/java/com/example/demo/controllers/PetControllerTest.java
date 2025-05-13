package com.example.demo.controllers;

import com.example.demo.dto.PetResponse;
import com.example.demo.dto.UserResponse;
import com.example.demo.model.Pet;
import com.example.demo.model.User;
import com.example.demo.service.PetService;
import com.example.demo.utils.JWTUtil;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BeanPropertyBindingResult;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class PetControllerTest {

    Pet pet;

    @InjectMocks
    private PetController petController;
    @Mock
    private JWTUtil jwtUtil;
    @Mock
    private PetService petService;


    @Test
    void addPet_validTokenAndValidPet() {
        String token = "validToken";
        pet = new Pet();
        pet.setName("Maximus");
        pet.setBreed("Mix");
        pet.setAgeYears(3);

        User user = new User();
        user.setId(123L);
        pet.setUser(user);

        Pet savedPet = new Pet();
        savedPet.setId(1L);
        savedPet.setName("Maximus");
        savedPet.setBreed("Mix");
        savedPet.setAgeYears(3);
        savedPet.setUser(user);

        Mockito.when(jwtUtil.isValidToken(token)).thenReturn(true);
        Mockito.when(jwtUtil.getKey(token)).thenReturn("123");
        Mockito.when(petService.addPet(pet, 123L)).thenReturn(savedPet);

        ResponseEntity<PetResponse> response = petController.addPet(pet, new BeanPropertyBindingResult(pet, "pet"),token);

        Assertions.assertEquals(HttpStatus.CREATED, response.getStatusCode());
        Assertions.assertEquals("Maximus", response.getBody().getName());
        Assertions.assertEquals("Mix", response.getBody().getBreed());
        Assertions.assertEquals(3, response.getBody().getAgeYears());

    }
    @Test
    void addPet_invalidToken_returnsUnauthorized() {
        String token = "invalidToken";
        Pet pet = new Pet();
        pet.setName("Firulais");
        pet.setBreed("Labrador");
        pet.setAgeYears(3);

        Mockito.when(jwtUtil.isValidToken(token)).thenReturn(false);

        ResponseEntity<PetResponse> response = petController.addPet(pet, new BeanPropertyBindingResult(pet, "pet"), token);

        Assertions.assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
    }
    @Test
    void addPet_invalidUserIdFormat_returnsBadRequest() {
        String token = "validToken";
        Pet pet = new Pet();

        Mockito.when(jwtUtil.isValidToken(token)).thenReturn(true);
        Mockito.when(jwtUtil.getKey(token)).thenReturn("notANumber");

        ResponseEntity<PetResponse> response = petController.addPet(pet, new BeanPropertyBindingResult(pet, "pet"), token);

        Assertions.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }
    @Test
    void addPet_userNotFound_returnsNotFound() {
        String token = "validToken";
        Pet pet = new Pet();
        pet.setName("Firulais");
        pet.setBreed("Labrador");
        pet.setAgeYears(3);

        Mockito.when(jwtUtil.isValidToken(token)).thenReturn(true);
        Mockito.when(jwtUtil.getKey(token)).thenReturn("123");
        Mockito.when(petService.addPet(pet, 123L)).thenThrow(new RuntimeException("User not found"));

        ResponseEntity<PetResponse> response = petController.addPet(pet, new BeanPropertyBindingResult(pet, "pet"), token);

        Assertions.assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }
    @Test
    void addPet_validationErrors_returnsBadRequestWithPetInfo() {
        String token = "validToken";
        Pet pet = new Pet();

        BeanPropertyBindingResult errors = new BeanPropertyBindingResult(pet, "pet");
        errors.rejectValue("name", "NotBlank");

        ResponseEntity<PetResponse> response = petController.addPet(pet, errors, token);

        Assertions.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }




    @Test
    void getPetsById_validToken_returnsPetList() {
        String token = "validToken";
        long userId = 123L;

        User user = new User();
        user.setId(userId);
        user.setFirstName("John");

        Pet pet = new Pet();
        pet.setId(1L);
        pet.setName("Firulais");
        pet.setBreed("Labrador");
        pet.setAgeYears(5);
        pet.setUser(user);

        List<PetResponse> petList = List.of(new PetResponse(pet));

        Mockito.when(jwtUtil.isValidToken(token)).thenReturn(true);
        Mockito.when(jwtUtil.getKey(token)).thenReturn(String.valueOf(userId));
        Mockito.when(petService.getPetsByUserId(userId)).thenReturn(petList);

        ResponseEntity<List<PetResponse>> response = petController.getPetsById(token);

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertNotNull(response.getBody());
        Assertions.assertEquals(1, response.getBody().size());

        PetResponse responsePet = response.getBody().get(0);
        Assertions.assertEquals("Firulais", responsePet.getName());
        Assertions.assertEquals("Labrador", responsePet.getBreed());
        Assertions.assertEquals(5, responsePet.getAgeYears());
        Assertions.assertEquals(userId, responsePet.getUserResponse().getId());
    }
    @Test
    void getPetsById_validToken_noPets() {
        String token = "validToken";
        long userId = 123L;

        Mockito.when(jwtUtil.isValidToken(token)).thenReturn(true);
        Mockito.when(jwtUtil.getKey(token)).thenReturn(String.valueOf(userId));
        Mockito.when(petService.getPetsByUserId(userId)).thenReturn(Collections.emptyList());

        ResponseEntity<List<PetResponse>> response = petController.getPetsById(token);

        Assertions.assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }
    @Test
    void getPetsById_invalidToken_returnsUnauthorized() {
        String token = "invalidToken";

        Mockito.when(jwtUtil.isValidToken(token)).thenReturn(false);

        ResponseEntity<List<PetResponse>> response = petController.getPetsById(token);

        Assertions.assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
    }
    @Test
    void getPetsById_tokenWithInvalidUserId_returnsBadRequest() {
        String token = "validToken";

        Mockito.when(jwtUtil.isValidToken(token)).thenReturn(true);
        Mockito.when(jwtUtil.getKey(token)).thenReturn("notANumber");

        ResponseEntity<List<PetResponse>> response = petController.getPetsById(token);

        Assertions.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }
    @Test
    void getPetsById_internalError_returnsServerError() {
        String token = "validToken";

        Mockito.when(jwtUtil.isValidToken(token)).thenReturn(true);
        Mockito.when(jwtUtil.getKey(token)).thenReturn("123");
        Mockito.when(petService.getPetsByUserId(123L)).thenThrow(new RuntimeException("DB error"));

        ResponseEntity<List<PetResponse>> response = petController.getPetsById(token);

        Assertions.assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
    }




    @Test
    void modifyPet_validTokenAndPet_success() {

        String token = "validToken";

        pet = new Pet();
        pet.setId(1L);
        pet.setName("Firulais");
        pet.setBreed("Mix");
        pet.setAgeYears(3);

        Pet updatedPet = new Pet();
        updatedPet.setId(1L);
        updatedPet.setName("Max");
        updatedPet.setBreed("Mix");
        updatedPet.setAgeYears(3);

        User user = new User();
        user.setId(123L);
        updatedPet.setUser(user);

        Mockito.when(jwtUtil.isValidToken(token)).thenReturn(true);
        Mockito.when(jwtUtil.getKey(token)).thenReturn("123");
        Mockito.when(petService.updatePet(123L, pet)).thenReturn(updatedPet);

        ResponseEntity<PetResponse> response = petController.modifyPet(pet, token);

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        PetResponse responseBody = response.getBody();
        assert responseBody != null;
        Assertions.assertEquals("Max", responseBody.getName());
        Assertions.assertEquals(123L, responseBody.getUserResponse().getId());
    }

    @Test
    void modifyPet_invalidToken_returnsUnauthorized() {
        String token = "invalid";
        pet = new Pet();

        Mockito.when(jwtUtil.isValidToken(token)).thenReturn(false);

        ResponseEntity<PetResponse> response = petController.modifyPet(pet, token);

        Assertions.assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
    }

    @Test
    void modifyPet_userIdFormatError_returnsBadRequest() {
        String token = "valid";
        pet = new Pet();

        Mockito.when(jwtUtil.isValidToken(token)).thenReturn(true);
        Mockito.when(jwtUtil.getKey(token)).thenReturn("notANumber");

        ResponseEntity<PetResponse> response = petController.modifyPet(pet, token);

        Assertions.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

    @Test
    void modifyPet_runtimeException_returnsNotFound() {
        String token = "valid";
        pet = new Pet();
        pet.setId(1L);

        Mockito.when(jwtUtil.isValidToken(token)).thenReturn(true);
        Mockito.when(jwtUtil.getKey(token)).thenReturn("123");
        Mockito.when(petService.updatePet(123L, pet)).thenThrow(new RuntimeException("Pet not found"));

        ResponseEntity<PetResponse> response = petController.modifyPet(pet, token);

        Assertions.assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }
}