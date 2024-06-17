package de.studytrade.studytradebackend.controller;

import de.studytrade.studytradebackend.model.AuthUser;
import de.studytrade.studytradebackend.service.EmailValidatorInterface;
import de.studytrade.studytradebackend.service.UserInterface;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import jakarta.servlet.http.HttpServletRequest;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserControllerTest {

    @InjectMocks
    private UserController userController;

    @Mock
    private UserInterface userService;

    @Mock
    private EmailValidatorInterface emailValidatorService;

    @Mock
    private HttpServletRequest request;

    private AuthUser user;

    @BeforeEach
    void setUp() {
        user = new AuthUser();
        user.setMail("test@hdm-stuttgart.de");
    }

    @Test
    void getAllUsers_ShouldReturnListOfUsers() {
        List<AuthUser> users = Collections.singletonList(user);
        when(userService.allUsers()).thenReturn(users);

        ResponseEntity<List<AuthUser>> response = userController.getAllUsers();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(users, response.getBody());
    }

    @Test
    void registerUser_ShouldReturnCreatedStatus_WhenUserIsValid() {
        when(userService.userExists(any(AuthUser.class))).thenReturn(false);
        when(emailValidatorService.isHdmMail(anyString())).thenReturn(true);
        when(request.getRequestURL()).thenReturn(new StringBuffer("http://localhost"));
        when(request.getServletPath()).thenReturn("/api/v1/users/register");

        ResponseEntity<String> response = userController.registerUser(user, request);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals("User added successfully", response.getBody());
    }

    @Test
    void registerUser_ShouldReturnErrorStatus_WhenUserAlreadyExists() {
        when(userService.userExists(any(AuthUser.class))).thenReturn(true);

        ResponseEntity<String> response = userController.registerUser(user, request);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("Failed to add user: User already exists", response.getBody());
    }

    @Test
    void registerUser_ShouldReturnErrorStatus_WhenEmailIsInvalid() {
        when(userService.userExists(any(AuthUser.class))).thenReturn(false);
        when(emailValidatorService.isHdmMail(anyString())).thenReturn(false);

        ResponseEntity<String> response = userController.registerUser(user, request);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("Failed to add user: Please register with valid HdM email", response.getBody());
    }

    @Test
    void verifyUser_ShouldReturnSuccess_WhenVerificationIsSuccessful() {
        when(userService.verify(anyString())).thenReturn(true);

        String response = userController.verifyUser("valid-code");

        assertEquals("verify_success", response);
    }

    @Test
    void verifyUser_ShouldReturnFail_WhenVerificationFails() {
        when(userService.verify(anyString())).thenReturn(false);

        String response = userController.verifyUser("invalid-code");

        assertEquals("verify_fail", response);
    }

    @Test
    void getSingleUser_ShouldReturnUser_WhenUserExists() {
        when(userService.singleUser(anyInt())).thenReturn(Optional.of(user));

        ResponseEntity<Optional<AuthUser>> response = userController.getSingleUser(1);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(Optional.of(user), response.getBody());
    }

    @Test
    void getFavorites_ShouldReturnFavorites_WhenUserExists() {
        List<Integer> favorites = List.of(1, 2, 3);
        when(userService.favorites(anyInt())).thenReturn(favorites);

        ResponseEntity<List<Integer>> response = userController.getFavorites(1);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(favorites, response.getBody());
    }

    @Test
    void updateUser_ShouldReturnSuccess_WhenUpdateIsSuccessful() {
        when(userService.updateUser(any(AuthUser.class))).thenReturn(null);

        ResponseEntity<String> response = userController.updateUser(user);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("User updated successfully", response.getBody());
    }

    @Test
    void updateFavorites_ShouldReturnSuccess_WhenUpdateIsSuccessful() {
        doNothing().when(userService).updateFavorites(anyInt(), anyInt());

        ResponseEntity<String> response = userController.updateFavorites(1, 1);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Favorites updated successfully", response.getBody());
    }

    @Test
    void deleteUser_ShouldReturnSuccess_WhenDeletionIsSuccessful() {
        doNothing().when(userService).deleteUser(anyInt());

        ResponseEntity<String> response = userController.deleteUser(1);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("User deleted successfully", response.getBody());
    }

    @Test
    void deleteFavorite_ShouldReturnSuccess_WhenDeletionIsSuccessful() {
        doNothing().when(userService).deleteFavorite(anyInt(), anyInt());

        ResponseEntity<String> response = userController.deleteFavorite(1, 1);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Favorite deleted successfully", response.getBody());
    }
}
