package com.example.demo.controllers;

import com.example.demo.dto.PetResponse;
import com.example.demo.model.Pet;
import com.example.demo.service.PetService;
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
    JWTUtil jwtUtil;
    @Autowired
    PetService petService;

    @PostMapping
    public ResponseEntity<PetResponse> addPet(@Valid @RequestBody Pet pet, BindingResult result, @RequestHeader(value = "Authorization") String token){
        try {
            if (result.hasErrors()) {return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new PetResponse(pet));}
            if (!jwtUtil.isValidToken(token)) {return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();}

            long userId = Long.parseLong(jwtUtil.getKey(token));

            Pet savedPet = petService.addPet(pet, userId);

            URI location = ServletUriComponentsBuilder
                    .fromCurrentRequest()
                    .path("/{id}")
                    .buildAndExpand(savedPet.getId())
                    .toUri();

            return ResponseEntity.created(location).body(new PetResponse(savedPet));

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
            if (!jwtUtil.isValidToken(token)){return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();}

            List<PetResponse> petResponses = petService.getAllPets();

            if (petResponses.isEmpty()) {return ResponseEntity.noContent().build();}
            return ResponseEntity.ok(petResponses);

        } catch (Exception e){
            System.out.println("Unexpected error: "+e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{petId}")
    public ResponseEntity<PetResponse> getPet(@PathVariable Long petId, @RequestHeader(value = "Authorization")String token){
        try {
            boolean validToken = jwtUtil.isValidToken(token);
            if (!validToken){return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();}

            long userId = Long.parseLong(jwtUtil.getKey(token));

            Pet pet = petService.getPetId(petId).orElseThrow(() -> new RuntimeException("Pet not found..."));

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
            if (!validToken) {return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();}
            long userId = Long.parseLong(jwtUtil.getKey(token));

            List<PetResponse> petResponses = petService.getPetsByUserId(userId);

            if (petResponses.isEmpty()) {return ResponseEntity.noContent().build();}

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

            Pet updatedPet = petService.updatePet(userId, pet);

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

            petService.deletePet(petId, userId);

            return ResponseEntity.ok("Pet deleted...");
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
