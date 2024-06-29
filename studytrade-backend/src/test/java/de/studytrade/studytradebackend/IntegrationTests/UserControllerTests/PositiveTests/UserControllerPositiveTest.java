package de.studytrade.studytradebackend.IntegrationTests.UserControllerTests.PositiveTests;

import de.studytrade.studytradebackend.controller.UserController;
import de.studytrade.studytradebackend.model.AuthUser;
import de.studytrade.studytradebackend.model.Product;
import de.studytrade.studytradebackend.service.EmailValidatorInterface;
import de.studytrade.studytradebackend.service.UserService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(SpringExtension.class)
public class UserControllerPositiveTest {

    @InjectMocks
    private UserController userController;

    @Mock
    private UserService userService;

    @Mock
    private EmailValidatorInterface emailValidatorInterface;

    /**
     * Test tests the registerUser method to see if the positive response actually happens.
     * It blocks any method that comes from the service class.
     * And verify that it has only been used once.
     *
     * @throws MessagingException
     * @throws UnsupportedEncodingException
     */
    @Test
    public void testRegisterUser() throws MessagingException, UnsupportedEncodingException {
        String url = "http://localhost:8080/api/v1/users/register";
        AuthUser user = new AuthUser();

        user.setMail("valid@hdm-stuttgart.de");
        user.setUsername("test");
        user.setPassword("password123");

        when(userService.userExists(any(AuthUser.class))).thenReturn(false);
        when(emailValidatorInterface.isHdmMail(any(String.class))).thenReturn(true);

        HttpServletRequest request = mock(HttpServletRequest.class);
        when(request.getRequestURL()).thenReturn(new StringBuffer(url));
        when(request.getServletPath()).thenReturn("/api/v1/users/register");

        ResponseEntity result = userController.registerUser(user, request);

        assertEquals(HttpStatus.CREATED, result.getStatusCode());
        assertEquals("User added successfully", result.getBody());

        verify(userService, times(1)).userExists(any(AuthUser.class));
        verify(emailValidatorInterface, times(1)).isHdmMail(any(String.class));
        verify(userService, times(1)).addUser(any(AuthUser.class), any(String.class));
    }

    /**
     * This test case verifies that when a verification code is provided,
     * the UserController's verifyUser method returns the expected success string ("verify_success").
     * It also checks that the UserService's verify method is called exactly once with any String argument.
     */
    @Test
    public void testVerifyUser() {
        String code = "testCode";

        when(userService.verify(any(String.class))).thenReturn(true);

        String result = userController.verifyUser(code);

        assertEquals("verify_success", result);

        verify(userService, times(1)).verify(any(String.class));

    }

    /**
     * Tests the getSingleUser method in the UserController class.
     * Verifies that the UserController correctly returns an HTTP OK status when a valid user ID is provided,
     * and ensures the UserService's singleUser method is called once with any Integer argument.
     */
    @Test
    public void testSingleUser() {
        AuthUser user = new AuthUser();

        user.setMail("valid@hdm-stuttgart.de");
        user.setUsername("test");
        user.setPassword("password123");

        when(userService.singleUser(any(ObjectId.class))).thenReturn(Optional.of(user));

        ResponseEntity<Optional<AuthUser>> result = userController.getSingleUser(new ObjectId());

        assertEquals(HttpStatus.OK, result.getStatusCode());

        verify(userService, times(1)).singleUser(any(ObjectId.class));
    }

    /**
     * Tests the getAllUsers method in the UserController class.
     * Verifies that the UserController returns an HTTP OK status when requesting all users,
     * and ensures the UserService's allUsers method is called once.
     */
    @Test
    public void testGetAllUsers() {
        AuthUser user = new AuthUser();

        user.setMail("valid@hdm-stuttgart.de");
        user.setUsername("test");
        user.setPassword("password123");

        AuthUser[] authUsers = {user, user};
        when(userService.allUsers()).thenReturn(List.of(authUsers));
        ResponseEntity<List<AuthUser>> result = userController.getAllUsers();
        assertEquals(HttpStatus.OK, result.getStatusCode());

        verify(userService, times(1)).allUsers();
    }

    /**
     * Tests the getFavorites method in the UserController class.
     * Verifies that the UserController returns an HTTP OK status when requesting a user's favorites,
     * and ensures the UserService's favorites method is called once with any Integer argument.
     */
    @Test
    public void testGetFavorites() {
        Product[] users = {new Product()};

        when(userService.favorites(any(ObjectId.class))).thenReturn(List.of(users));

        ResponseEntity<List<Product>> result = userController.getFavorites(new ObjectId());
        assertEquals(HttpStatus.OK, result.getStatusCode());
        verify(userService, times(1)).favorites(any(ObjectId.class));
    }

    /**
     * Tests the updateUser method in the UserController class.
     * Verifies that the UserController returns an HTTP OK status and a success message when updating a user,
     * and ensures the UserService's updateUser method is called once with any AuthUser argument.
     */
    @Test
    public void testUpdateUser() {
        AuthUser user = new AuthUser();

        user.setMail("valid@hdm-stuttgart.de");
        user.setUsername("test");
        user.setPassword("password123");
        when(userService.updateUser(any(AuthUser.class))).thenReturn(Optional.of(user));

        ResponseEntity<String> result = userController.updateUser(user);

        assertEquals(HttpStatus.OK, result.getStatusCode());
        assertEquals("User updated successfully", result.getBody());

        verify(userService, times(1)).updateUser(any(AuthUser.class));
    }

    /**
     * Tests the updateFavorites method in the UserController class.
     * Verifies that the UserController returns an HTTP OK status and a success message when updating user favorites,
     * and ensures the UserService's updateFavorites method is called once with any two Integer arguments.
     */
    @Test
    public void testUpdateFavorites() {

        ObjectId userId = new ObjectId();
        ObjectId id = new ObjectId();

        ResponseEntity<String> result = userController.updateFavorites(userId, id);

        assertEquals(HttpStatus.OK, result.getStatusCode());
        assertEquals("Favorites updated successfully", result.getBody());

        verify(userService, times(1)).updateFavorites(any(ObjectId.class), any(ObjectId.class));
    }

    /**
     * Tests the deleteUser method in the UserController class.
     * Verifies that the UserController returns an HTTP OK status and a success message when deleting a user,
     * and ensures the UserService's deleteUser method is called once with any Integer argument.
     */
    @Test
    public void testDeleteUser() {

        ObjectId userId = new ObjectId();

        ResponseEntity<String> result = userController.deleteUser(userId);

        assertEquals(HttpStatus.OK, result.getStatusCode());
        assertEquals("User deleted successfully", result.getBody());

        verify(userService, times(1)).deleteUser(any(ObjectId.class));
    }

    /**
     * Tests the deleteFavorite method in the UserController class.
     * Verifies that the UserController returns an HTTP OK status and a success message when deleting a user's favorite,
     * and ensures the UserService's deleteFavorite method is called once with any two Integer arguments.
     */
    @Test
    public void testDeleteFavorites() {
        ObjectId userId = new ObjectId();
        ObjectId productId = new ObjectId();

        doNothing().when(userService).deleteFavorite(any(ObjectId.class), any(ObjectId.class));

        ResponseEntity<String> result = userController.deleteFavorite(userId, productId);

        assertEquals(HttpStatus.OK, result.getStatusCode());
        assertEquals("Favorite deleted successfully", result.getBody());
        verify(userService, times(1)).deleteFavorite(any(ObjectId.class), any(ObjectId.class));
    }



}
