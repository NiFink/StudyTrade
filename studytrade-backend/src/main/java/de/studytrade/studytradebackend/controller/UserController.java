package de.studytrade.studytradebackend.controller;

import de.studytrade.studytradebackend.model.AuthUser;
import de.studytrade.studytradebackend.service.EmailValidatorInterface;
import de.studytrade.studytradebackend.service.UserInterface;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserInterface userService;

    @Autowired
    private EmailValidatorInterface emailValidatorService;

    @GetMapping
    @Operation(summary = "Get all Users", description = "Get all Users which are listed in the database")
    public ResponseEntity<List<AuthUser>> getAllUsers() {
        return new ResponseEntity<>(userService.allUsers(), HttpStatus.OK);
    }

    @PostMapping("/register")
    @Operation(summary = "Register a new User", description = "Register a new User with HdM email")
    public ResponseEntity registerUser(@RequestBody @Schema(description = "User to be registered") AuthUser user,
            HttpServletRequest request) {
        try {
            if (userService.userExists(user)) {
                throw new RuntimeException("User already exists");
            } else if (!emailValidatorService.isHdmMail(user.getMail())) {
                throw new RuntimeException("Please register with valid HdM email");
            }
            userService.addUser(user, getSiteURL(request));
            return new ResponseEntity<>("User added successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to add user: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/verify")
    @Operation(summary = "Verify a User", description = "Verify a User with verification code")
    public String verifyUser(@Param("code") @Schema(description = "Verification code") String code) {
        if (userService.verify(code)) {
            return "verify_success";
        } else {
            return "verify_fail";
        }
    }

    @GetMapping("/{userId}")
    @Operation(summary = "Get a single User by ID", description = "Get a single User by ID")
    public ResponseEntity<Optional<AuthUser>> getSingleUser(
            @PathVariable @Schema(description = "ID of the User") int userId) {
        return new ResponseEntity<>(userService.singleUser(userId), HttpStatus.OK);
    }

    @GetMapping("/{userId}/favorites")
    @Operation(summary = "Get favorites of a User by ID", description = "Get favorites of a User by ID")
    public ResponseEntity<List<Integer>> getFavorites(
            @PathVariable @Schema(description = "ID of the User") int userId) {
        return new ResponseEntity<>(userService.favorites(userId), HttpStatus.OK);
    }

    private String getSiteURL(HttpServletRequest request) {
        String siteURL = request.getRequestURL().toString();
        return siteURL.replace(request.getServletPath(), "");
    }

    @PutMapping
    @Operation(summary = "Update a User", description = "Update a User by ID")
    public ResponseEntity<String> updateUser(
            @RequestBody @Schema(description = "User to be updated") AuthUser userRequest) {
        try {
            userService.updateUser(userRequest);
            return new ResponseEntity<>("User updated successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to update user: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{userId}/favorites/{productId}")
    @Operation(summary = "Update favorites of a User", description = "Update favorites of a User by ID")
    public ResponseEntity<String> updateFavorites(@PathVariable @Schema(description = "ID of the User") int userId,
            @PathVariable @Schema(description = "ID of the Product") int productId) {
        try {
            userService.updateFavorites(userId, productId);
            return new ResponseEntity<>("Favorites updated successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to update favorites: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{userId}")
    @Operation(summary = "Delete a User by ID", description = "Delete a User by ID")
    public ResponseEntity<String> deleteUser(@PathVariable @Schema(description = "ID of the User") int userId) {
        try {
            userService.deleteUser(userId);
            return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to delete user: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{userId}/favorites/{productId}")
    @Operation(summary = "Delete a favorite of a User", description = "Delete a favorite of a User by userID and productID")
    public ResponseEntity<String> deleteFavorite(@PathVariable @Schema(description = "ID of the User") int userId,
            @PathVariable @Schema(description = "ID of the Product") int productId) {
        try {
            userService.deleteFavorite(userId, productId);
            return new ResponseEntity<>("Favorite deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to delete favorite: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
