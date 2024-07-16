package de.studytrade.studytradebackend.UnitTests.NegativeTests;

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

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceNegativeTest {
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


    /**
     * Test verification with a non-existing user.
     * Ensures that the verification process fails when the user is not found.
     */
    @Test
    public void testVerifyUserNotFound() {
        when(userRepository.findAuthUserByVerificationCode("randomCode123")).thenReturn(Optional.empty());

        boolean result = userService.verify("randomCode123");

        assertFalse(result);
        verify(userRepository, never()).save(any(AuthUser.class));
    }

}
