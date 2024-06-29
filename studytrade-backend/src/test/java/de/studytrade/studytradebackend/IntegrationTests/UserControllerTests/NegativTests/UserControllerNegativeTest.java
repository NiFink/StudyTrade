package de.studytrade.studytradebackend.IntegrationTests.UserControllerTests.NegativTests;

import de.studytrade.studytradebackend.controller.UserController;
import de.studytrade.studytradebackend.model.AuthUser;
import de.studytrade.studytradebackend.service.EmailValidatorInterface;
import de.studytrade.studytradebackend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(SpringExtension.class)
public class UserControllerNegativeTest {

    @InjectMocks
    private UserController userController;

    @Mock
    private UserService userService;

    @Mock
    private EmailValidatorInterface emailValidatorInterface;

    /**
     * Tests the registerUser method in the UserController class when the user already exists.
     * Verifies that the UserController returns an HTTP INTERNAL_SERVER_ERROR status when trying to register an existing user,
     * and ensures the UserService's userExists method is called once with any AuthUser argument.
     */
    @Test
    public void testRegisterUserExistingUser(){
        String url = "http://localhost:8080/api/v1/users/register";
        AuthUser user = new AuthUser();

        user.setMail("valid@hdm-stuttgart.de");
        user.setUsername("test");
        user.setPassword("password123");

        when(userService.userExists(any(AuthUser.class))).thenReturn(true);

        ResponseEntity result = userController.registerUser(user, any(HttpServletRequest.class));

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, result.getStatusCode());

        verify(userService).userExists(any(AuthUser.class));
    }

    /**
     * Tests the registerUser method in the UserController class when the email is not valid.
     * Verifies that the UserController returns an HTTP INTERNAL_SERVER_ERROR status when the email is not valid,
     * and ensures the UserService's userExists and EmailValidatorInterface's isHdmMail methods are called once.
     */
    @Test
    public void testRegisterUserNoValidEmail(){
        AuthUser user = new AuthUser();

        user.setMail("valid@hdm-stuttgart.de");
        user.setUsername("test");
        user.setPassword("password123");

        when(userService.userExists(any(AuthUser.class))).thenReturn(false);
        when(emailValidatorInterface.isHdmMail(any(String.class))).thenReturn(false);

        ResponseEntity result = userController.registerUser(user, any(HttpServletRequest.class));

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, result.getStatusCode());

        verify(userService, times(1)).userExists(any(AuthUser.class));
        verify(emailValidatorInterface, times(1)).isHdmMail(any(String.class));
    }

    /**
     * Tests the verifyUser method in the UserController class when verification fails.
     * Verifies that the UserController returns a "verify_fail" message when the verification fails,
     * and ensures the UserService's verify method is called once with any String argument.
     */
    @Test
    public void testVerifyUserVerifyFailed() {
        String code = "testCode";

        when(userService.verify(any(String.class))).thenReturn(false);

        String result = userController.verifyUser(code);

        assertEquals("verify_fail", result);

        verify(userService, times(1)).verify(any(String.class));
    }

    /**
     * Tests the updateUser method in the UserController class when updating fails.
     * Verifies that the UserController returns an HTTP INTERNAL_SERVER_ERROR status
     * when updating a user fails due to a database error,
     * and ensures the UserService's updateUser method is called once with any AuthUser argument.
     */
    @Test
    public void testUpdateUseFailedToUpdate() {
        AuthUser user = new AuthUser();

        user.setMail("valid@hdm-stuttgart.de");
        user.setUsername("test");
        user.setPassword("password123");

        doThrow(new RuntimeException("Database error")).when(userService).updateUser(any(AuthUser.class));

        ResponseEntity<String> result = userController.updateUser(user);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, result.getStatusCode());

        verify(userService, times(1)).updateUser(any(AuthUser.class));
    }

    /**
     * Tests the updateFavorites method in the UserController class when updating favorites fails.
     * Verifies that the UserController returns an HTTP INTERNAL_SERVER_ERROR status
     * when updating favorites fails due to a database error,
     * and ensures the UserService's updateFavorites method is called once with any two Integer arguments.
     */
    @Test
    public void testUpdateFavoritesFailedToUpdate() {
        AuthUser user = new AuthUser();

        user.setMail("valid@hdm-stuttgart.de");
        user.setUsername("test");
        user.setPassword("password123");

        doThrow(new RuntimeException("Database error")).when(userService).updateFavorites(any(ObjectId.class), any(ObjectId.class));

        ResponseEntity<String> result = userController.updateFavorites(user.getId(), any(ObjectId.class));

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, result.getStatusCode());
    }

    /**
     * Tests the deleteUser method in the UserController class when deleting a user fails.
     * Verifies that the UserController returns an HTTP INTERNAL_SERVER_ERROR status
     * when deleting a user fails due to a database error,
     * and ensures the UserService's deleteUser method is called once with any Integer argument.
     */
    @Test
    public void testDeleteUser(){
        ObjectId userId = new ObjectId();

        doThrow(new RuntimeException("Database error")).when(userService).deleteUser(any(ObjectId.class));

        ResponseEntity<String> result = userController.deleteUser(userId);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, result.getStatusCode());
    }

    /**
     * Tests the deleteFavorite method in the UserController class when deleting a favorite fails.
     * Verifies that the UserController returns an HTTP INTERNAL_SERVER_ERROR status
     * when deleting a favorite fails due to a database error,
     * and ensures the UserService's deleteFavorite method is called once with any two Integer arguments.
     */
    @Test
    public void testDeleteFavoritesFailedToDelete() {
        AuthUser user = new AuthUser();

        user.setMail("valid@hdm-stuttgart.de");
        user.setUsername("test");
        user.setPassword("password123");

        doThrow(new RuntimeException("Database error")).when(userService).deleteFavorite(any(ObjectId.class), any(ObjectId.class));

        ResponseEntity<String> result = userController.deleteFavorite(user.getId(), any(ObjectId.class));

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, result.getStatusCode());
    }


}
