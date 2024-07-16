package de.studytrade.studytradebackend.UnitTests.PositiveTests;

import de.studytrade.studytradebackend.model.AuthUser;
import de.studytrade.studytradebackend.model.Product;
import de.studytrade.studytradebackend.repository.AuthUserRepository;
import de.studytrade.studytradebackend.repository.ProductRepository;
import de.studytrade.studytradebackend.service.UserService;
import de.studytrade.studytradebackend.service.interfaces.SendEmailInterface;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServicePositiveTest {
    @Mock
    private AuthUserRepository userRepository;

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private UserService userService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private SendEmailInterface emailInterface;

    private AuthUser user;
    private String url = "www.hdm-stuttgart.de";
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
     * Test successful user verification.
     * Verifies that the user is enabled and the verification code is removed.
     */
    @Test
    public void testVerifySuccess() {
        when(userRepository.findAuthUserByVerificationCode("randomCode123")).thenReturn(Optional.of(user));

        boolean result = userService.verify("randomCode123");

        assertTrue(result);
        assertNull(user.getVerificationCode());
        assertTrue(user.isEnabled());
        verify(userRepository, times(1)).save(user);
    }

    /**
     * Test updating a user.
     * Verifies that the user's details are updated correctly.
     */
    @Test
    public void testUpdateUser() {
        when(userRepository.findAuthUserById(any(ObjectId.class))).thenReturn(Optional.of(user));
        when(userRepository.save(any(AuthUser.class))).thenReturn(updatedUser);

        Optional<AuthUser> userUpdated = userService.updateUser(updatedUser);

        assertTrue(userUpdated.isPresent());
        assertEquals(updatedUser.getUsername(), userUpdated.get().getUsername());
        assertEquals(updatedUser.getMail(), userUpdated.get().getMail());
        assertEquals(updatedUser.getProfileImage(), userUpdated.get().getProfileImage());
        assertEquals(updatedUser.getFavorites(), userUpdated.get().getFavorites());

        verify(userRepository, times(1)).findAuthUserById(any(ObjectId.class));
        verify(userRepository, times(1)).save(any(AuthUser.class));
    }

    /**
     * Test updating user's favorites.
     * Verifies that the specified product is added to the user's favorites.
     */
    @Test
    public void testUpdateFavorites() {
        user.setFavorites(new ArrayList<>());
        Product product = new Product();
        product.setId(new ObjectId("60d5f9b95f4a4e2f4b8e1a78"));
        product.setName("testProduct");

        when(userRepository.findAuthUserById(any(ObjectId.class))).thenReturn(Optional.of(user));
        when(productRepository.findProductById(any(ObjectId.class))).thenReturn(Optional.of(product));
        when(userRepository.save(any(AuthUser.class))).thenReturn(user);

        userService.updateFavorites(new ObjectId("60d5f9b95f4a4e2f4b8e1a77"), new ObjectId("60d5f9b95f4a4e2f4b8e1a78"));

        assertTrue(user.getFavorites().contains(product));

        verify(userRepository, times(1)).findAuthUserById(any(ObjectId.class));
        verify(productRepository, times(1)).findProductById(any(ObjectId.class));
        verify(userRepository, times(1)).save(any(AuthUser.class));
    }

    /**
     * Test deleting a favorite product.
     * Verifies that the specified product is removed from the user's favorites.
     */
    @Test
    public void testDeleteFavorite() {
        Product product = new Product();
        product.setId(new ObjectId("60d5f9b95f4a4e2f4b8e1a77"));
        ArrayList<Product> products = new ArrayList<>();
        user.setFavorites(products);

        when(productRepository.findProductById(any(ObjectId.class))).thenReturn(Optional.of(product));
        when(userRepository.findAuthUserById(any(ObjectId.class))).thenReturn(Optional.of(user));

        userService.deleteFavorite(user.getId(), product.getId());

        assertFalse(user.getFavorites().contains(product));
        verify(userRepository, times(1)).save(user);
        verify(productRepository, times(1)).findProductById(any(ObjectId.class));
        verify(userRepository, times(1)).findAuthUserById(any(ObjectId.class));
    }
}
