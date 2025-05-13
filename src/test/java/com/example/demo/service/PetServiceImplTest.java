package com.example.demo.service;

import com.example.demo.dto.PetResponse;
import com.example.demo.model.Pet;
import com.example.demo.model.User;
import com.example.demo.respository.PetRepository;
import com.example.demo.respository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class PetServiceImplTest {

    @InjectMocks
    private PetServiceImpl petService;
    @Mock
    private PetRepository petRepository;
    @Mock
    private UserRepository userRepository;


    @Test
    void addPet_validUser_savesAndReturnsPet() {
        Pet pet = new Pet();
        pet.setName("Boots");
        pet.setBreed("Mix");
        pet.setAgeYears(3);

        User user = new User();
        user.setId(1L);

        Mockito.when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        Mockito.when(petRepository.save(Mockito.any(Pet.class))).thenReturn(pet);

        Pet result = petService.addPet(pet, 1L);

        Assertions.assertEquals(user, result.getUser());
        Assertions.assertEquals("Boots", result.getName());
    }
    @Test
    void addPet_userNotFound_throwsException() {
        Pet pet = new Pet();

        Mockito.when(userRepository.findById(99L)).thenReturn(Optional.empty());

        Assertions.assertThrows(RuntimeException.class, () -> {
            petService.addPet(pet, 99L);
        });
    }




    @Test
    void getPetsByUserId_withExistingPets_returnsPetResponses() {
        Pet pet = new Pet();
        pet.setId(10L);
        pet.setName("Dog");
        pet.setBreed("German");
        pet.setAgeYears(3);
        User user = new User();
        user.setId(1L);
        pet.setUser(user);

        Mockito.when(petRepository.findByUser_Id(1L)).thenReturn(List.of(pet));

        List<PetResponse> result = petService.getPetsByUserId(1L);

        assertEquals(1, result.size());
        PetResponse response = result.get(0);
        assertEquals(pet.getId(), response.getId());
        assertEquals(pet.getName(), response.getName());
        assertEquals(pet.getBreed(), response.getBreed());
        assertEquals(pet.getAgeYears(), response.getAgeYears());
        assertEquals(pet.getUser().getId(), response.getUserResponse().getId());
    }
    @Test
    void getPetsByUserId_withNoPets_returnsEmptyList() {
        Mockito.when(petRepository.findByUser_Id(1L)).thenReturn(List.of());

        List<PetResponse> result = petService.getPetsByUserId(1L);

        assertTrue(result.isEmpty());
    }



    @Test
    void updatePet_validData_success() {
        long userId = 1L;

        User user = new User();
        user.setId(userId);

        Pet incomingPet = new Pet();
        incomingPet.setId(10L);
        incomingPet.setName("Max");
        incomingPet.setBreed("dutch");
        incomingPet.setAgeYears(4);

        Pet existingPet = new Pet();
        existingPet.setId(10L);
        existingPet.setUser(user);
        existingPet.setName("OldName");
        existingPet.setBreed("OldBreed");
        existingPet.setAgeYears(2);

        Mockito.when(petRepository.findById(10L)).thenReturn(Optional.of(existingPet));
        Mockito.when(petRepository.save(Mockito.any(Pet.class))).thenReturn(existingPet);

        Pet result = petService.updatePet(userId, incomingPet);

        Assertions.assertEquals("Max", result.getName());
        Assertions.assertEquals("dutch", result.getBreed());
        Assertions.assertEquals(4, result.getAgeYears());
    }
    @Test
    void updatePet_petNotFound_throwsException() {
        long userId = 1L;
        Pet pet = new Pet();
        pet.setId(99L);

        Mockito.when(petRepository.findById(99L)).thenReturn(Optional.empty());

        Assertions.assertThrows(RuntimeException.class, () -> {
            petService.updatePet(userId, pet);
        });
    }
    @Test
    void updatePet_userIsNotOwner_throwsException() {
        long userId = 1L;

        User owner = new User();
        owner.setId(2L);

        Pet pet = new Pet();
        pet.setId(10L);

        Pet existingPet = new Pet();
        existingPet.setId(10L);
        existingPet.setUser(owner);

        Mockito.when(petRepository.findById(10L)).thenReturn(Optional.of(existingPet));

        Assertions.assertThrows(RuntimeException.class, () -> {
            petService.updatePet(userId, pet);
        });
    }
    @Test
    void updatePet_withNullAndEmptyFields_shouldIgnoreThem() {
        long userId = 1L;

        User user = new User();
        user.setId(userId);

        Pet incomingPet = new Pet();
        incomingPet.setId(10L);
        incomingPet.setName("");
        incomingPet.setBreed(null);
        incomingPet.setAgeYears(0);

        Pet existingPet = new Pet();
        existingPet.setId(10L);
        existingPet.setUser(user);
        existingPet.setName("Max");
        existingPet.setBreed("Beagle");
        existingPet.setAgeYears(5);

        Mockito.when(petRepository.findById(10L)).thenReturn(Optional.of(existingPet));
        Mockito.when(petRepository.save(Mockito.any(Pet.class))).thenReturn(existingPet);

        Pet result = petService.updatePet(userId, incomingPet);

        Assertions.assertEquals("Max", result.getName());
        Assertions.assertEquals("Beagle", result.getBreed());
        Assertions.assertEquals(5, result.getAgeYears());
    }
}