package de.studytrade.studytradebackend.UnitTests.BorderTests;

import de.studytrade.studytradebackend.model.AuthUser;
import de.studytrade.studytradebackend.model.Product;
import de.studytrade.studytradebackend.repository.AuthUserRepository;
import de.studytrade.studytradebackend.repository.ProductRepository;
import de.studytrade.studytradebackend.service.UserService;
import de.studytrade.studytradebackend.service.interfaces.SendEmailInterface;
import jakarta.mail.MessagingException;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceBorderTest {

    @Mock
    private AuthUserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private SendEmailInterface emailInterface;

    private AuthUser user;
    private final String url = "www.hdm-stuttgart.de";
    private AuthUser updatedUser;

    /**
     * Sets up initial data for testing purposes.
     * Creates an AuthUser instance with default values for testing user operations.
     */
    @BeforeEach
    public void setUp() {
        user = new AuthUser();
        user.setId(new ObjectId("60d5f9b95f4a4e2f4b8e1a77"));
        user.setUsername("testUser");
        user.setPassword("1234");
        user.setMail("test@hdm-stuttgart.de");
        user.setVerificationCode("randomCode123");
        user.setEnabled(false);

        updatedUser = new AuthUser();
        updatedUser.setId(new ObjectId("60d5f9b95f4a4e2f4b8e1a77"));
        updatedUser.setUsername("testUserUpdate");
        updatedUser.setPassword("1234");
        updatedUser.setProfileImage("testImage.jpg");
        updatedUser.setMail("user@hdm-stuttgart.de");
        updatedUser.setVerificationCode("randomCode1236");
        updatedUser.setEnabled(false);

        // Setting up favorites for updatedUser
        List<Product> favorites = new ArrayList<>();
        favorites.add(new Product());
        updatedUser.setFavorites(favorites);
    }

    /**
     * Test adding a user without a profile image.
     * Verifies that the user is correctly initialized, saved, and a verification email is sent.
     */
    @Test
    public void testAddUserNoProfileImage() throws UnsupportedEncodingException, MessagingException {
        doNothing().when(emailInterface).sendVerificationEmail(
                any(AuthUser.class), any(String.class), any(String.class), any(String.class)
        );
        userService.addUser(user, url);

        assertNotNull(user.getCreationDate());
        assertFalse(user.isEnabled());
        assertNotEquals(user.getPassword(), "1234");
        assertNotNull(user.getVerificationCode());
        assertNotNull(user.getProfileImage());
        assertEquals(user.getId() + ".jpg", user.getProfileImage());

        verify(userRepository, times(1)).save(user);
        verify(emailInterface, times(1)).sendVerificationEmail(any(AuthUser.class), any(String.class), any(String.class), any(String.class));
        verify(passwordEncoder, times(1)).encode(anyString());
    }

    /**
     * Test adding a user with an existing profile image.
     * Ensures that the user is correctly initialized and a verification email is sent.
     */
    @Test
    public void testAddUserExistingProfileImage() throws UnsupportedEncodingException, MessagingException {
        user.setProfileImage("12345.jpg");
        doNothing().when(emailInterface).sendVerificationEmail(
                any(AuthUser.class), any(String.class), any(String.class), any(String.class)
        );
        userService.addUser(user, url);

        assertNotNull(user.getCreationDate());
        assertFalse(user.isEnabled());
        assertNotEquals(user.getPassword(), "1234");
        assertNotNull(user.getVerificationCode());

        verify(userRepository, times(1)).save(user);
        verify(emailInterface, times(1)).sendVerificationEmail(any(AuthUser.class), any(String.class), any(String.class), any(String.class));
        verify(passwordEncoder, times(1)).encode(anyString());
    }





    /**
     * Test verification for an already enabled user.
     * Ensures that the verification process fails if the user is already enabled.
     */
    @Test
    public void testVerifyUserAlreadyEnabled() {
        user.setEnabled(true);

        when(userRepository.findAuthUserByVerificationCode("randomCode123")).thenReturn(Optional.of(user));

        boolean result = userService.verify("randomCode123");

        assertFalse(result);
        verify(userRepository, never()).save(any(AuthUser.class));
    }



    /**
     * Test updating a user with a null username.
     * Ensures that the username is not updated to null.
     */
    @Test
    public void testUpdateUserUsernameNull() {
        updatedUser.setUsername(null);

        when(userRepository.findAuthUserById(any(ObjectId.class))).thenReturn(Optional.of(user));
        when(userRepository.save(any(AuthUser.class))).thenReturn(user);

        Optional<AuthUser> userUpdated = userService.updateUser(updatedUser);

        assertTrue(userUpdated.isPresent());
        assertEquals(user.getUsername(), userUpdated.get().getUsername());
    }

    /**
     * Test updating a user with a null password.
     * Ensures that the password is not updated to null.
     */
    @Test
    public void testUpdateUserPasswordNull() {
        updatedUser.setPassword(null);

        when(userRepository.findAuthUserById(any(ObjectId.class))).thenReturn(Optional.of(user));
        when(userRepository.save(any(AuthUser.class))).thenReturn(user);

        Optional<AuthUser> userUpdated = userService.updateUser(updatedUser);

        assertTrue(userUpdated.isPresent());
        assertEquals(user.getPassword(), userUpdated.get().getPassword());
    }

    /**
     * Test updating a user with a null email.
     * Ensures that the email is not updated to null.
     */
    @Test
    public void testUpdateUserMailNull() {
        updatedUser.setMail(null);

        when(userRepository.findAuthUserById(any(ObjectId.class))).thenReturn(Optional.of(user));
        when(userRepository.save(any(AuthUser.class))).thenReturn(user);

        Optional<AuthUser> userUpdated = userService.updateUser(updatedUser);

        assertTrue(userUpdated.isPresent());
        assertEquals(user.getMail(), userUpdated.get().getMail());
    }

    /**
     * Test updating a user with a null profile image.
     * Ensures that the profile image is not updated to null.
     */
    @Test
    public void testUpdateUserProfileImageNull() {
        updatedUser.setProfileImage(null);

        when(userRepository.findAuthUserById(any(ObjectId.class))).thenReturn(Optional.of(user));
        when(userRepository.save(any(AuthUser.class))).thenReturn(user);

        Optional<AuthUser> userUpdated = userService.updateUser(updatedUser);

        assertTrue(userUpdated.isPresent());
        assertEquals(user.getProfileImage(), userUpdated.get().getProfileImage());
    }

    /**
     * Test updating a user with null favorites.
     * Ensures that the favorite list is not updated to null.
     */
    @Test
    public void testUpdateUserFavoritesNull() {
        updatedUser.setFavorites(null);

        when(userRepository.findAuthUserById(any(ObjectId.class))).thenReturn(Optional.of(user));
        when(userRepository.save(any(AuthUser.class))).thenReturn(user);

        Optional<AuthUser> userUpdated = userService.updateUser(updatedUser);

        assertTrue(userUpdated.isPresent());
        assertEquals(user.getFavorites(), userUpdated.get().getFavorites());
    }
}
