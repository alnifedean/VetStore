package com.example.demo.controllers;

import com.example.demo.dto.PetResponse;
import com.example.demo.model.Pet;
import com.example.demo.model.User;
import com.example.demo.respository.PetRepository;
import com.example.demo.respository.UserRepository;
import com.example.demo.utils.JWTUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("pet")
public class PetController {

    @Autowired
    PetRepository petRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    JWTUtil jwtUtil;

    @PostMapping
    public ResponseEntity<PetResponse> addPet(@Valid @RequestBody Pet pet, BindingResult result, @RequestHeader(value = "Authorization") String token){
        try {
            if (result.hasErrors()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new PetResponse(pet));
            }
            boolean validToken = jwtUtil.isValidToken(token);
            if (validToken) {
                long userId = Long.parseLong(jwtUtil.getKey(token));
                User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found..."));
                pet.setUser(user);

                petRepository.save(pet);

                URI location = ServletUriComponentsBuilder
                        .fromCurrentRequest()
                        .path("/{id}")
                        .buildAndExpand(pet.getId())
                        .toUri();

                return ResponseEntity.created(location).body(new PetResponse(pet));
            } else {return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();}
        } catch (NumberFormatException e){
            System.out.println("Invalid user ID format. "+e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (RuntimeException e){
            System.out.println("Pet or user does not exist: "+e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e){
            System.out.println("Unexpected error: "+e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<PetResponse>> getAllPets(@RequestHeader(value = "Authorization")String token) {
        try {
            boolean tokenValid = jwtUtil.isValidToken(token);
            if (tokenValid){
                List<Pet> pets = petRepository.findAll();
                if (pets.isEmpty()) {return ResponseEntity.noContent().build();}

                List<PetResponse> petResponses = pets.stream()
                        .map(PetResponse::new)
                        .toList();

                return ResponseEntity.ok(petResponses);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e){
            System.out.println("Unexpected error: "+e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{petId}")
    public ResponseEntity<PetResponse> getPet(@PathVariable Long petId, @RequestHeader(value = "Authorization")String token){
        try {
            boolean validToken = jwtUtil.isValidToken(token);
            if (!validToken){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            long userId = Long.parseLong(jwtUtil.getKey(token));
            Pet pet = petRepository.findById(petId).orElseThrow(() -> new RuntimeException("Pet not found..."));
            if (userId==pet.getUserId()) {
                return ResponseEntity.ok(new PetResponse(pet));
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
        } catch (NumberFormatException e){
            System.out.println("Invalid user ID format. "+e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (RuntimeException e) {
            System.out.println("No pet found: "+e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            System.out.println("Unexpected error: "+e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<PetResponse>> getPetsById(@RequestHeader(value = "Authorization") String token) {
        try {
            boolean validToken = jwtUtil.isValidToken(token);
            if (!validToken) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            long userId = Long.parseLong(jwtUtil.getKey(token));
            List<Pet> pets = petRepository.findByUser_Id(userId);
            if (pets.isEmpty()) {
                return ResponseEntity.noContent().build();
            }

            List<PetResponse> petResponses = pets.stream()
                    .map(PetResponse::new)
                    .toList();

            return ResponseEntity.ok(petResponses);
        } catch (NumberFormatException e){
            System.out.println("Invalid user ID format. "+e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (Exception e) {
            System.out.println("Unexpected error: "+e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping
    public ResponseEntity<PetResponse> modifyPet(@RequestBody Pet pet, @RequestHeader(value = "Authorization")String token){
        try {
            boolean validToken = jwtUtil.isValidToken(token);
            if (!validToken) {return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();}

            long userId = Long.parseLong(jwtUtil.getKey(token));
            Pet updatedPet = petRepository.findById(pet.getId()).orElseThrow(() -> new RuntimeException("Pet not found..."));

            if (userId!=updatedPet.getUserId()){return ResponseEntity.status(HttpStatus.FORBIDDEN).build();}
            if (pet.getName() != null && !pet.getName().isEmpty()) {updatedPet.setName(pet.getName());}
            if (pet.getBreed() != null && !pet.getBreed().isEmpty()) {updatedPet.setBreed(pet.getBreed());}
            if (pet.getAgeYears() != null && pet.getAgeYears() > 0) {updatedPet.setAgeYears(pet.getAgeYears());}

            petRepository.save(updatedPet);
            return ResponseEntity.ok(new PetResponse(updatedPet));
        } catch (NumberFormatException e){
            System.out.println("Invalid user ID format. "+e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (RuntimeException e) {
            System.out.println("No pet found: "+e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            System.out.println("Unexpected error: "+e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{petId}")
    public ResponseEntity<String> deletePet(@PathVariable Long petId, @RequestHeader(value = "Authorization") String token){
        try {
            boolean validToken = jwtUtil.isValidToken(token);

            if (!validToken){return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You need to login");}

            long userId = Long.parseLong(jwtUtil.getKey(token));
            Pet deletedPet = petRepository.findById(petId).orElseThrow(() -> new RuntimeException("Pet not found..."));

            if(userId==deletedPet.getUserId()){
                petRepository.delete(deletedPet);
                return ResponseEntity.ok("Pet deleted...");
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not the owner of this pet.");
            }
        } catch (NumberFormatException e){
            System.out.println("Invalid user ID format. "+e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid user ID format. ");
        } catch (RuntimeException e) {
            System.out.println("No pet found: "+e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No pet found");
        } catch (Exception e) {
            System.out.println("Unexpected error: "+e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error");
        }
    }
}
