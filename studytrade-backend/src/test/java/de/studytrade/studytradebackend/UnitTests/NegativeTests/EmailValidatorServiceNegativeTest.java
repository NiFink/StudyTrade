package de.studytrade.studytradebackend.UnitTests.NegativeTests;

import de.studytrade.studytradebackend.service.EmailValidatorService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertFalse;

/**
 * Unit tests for negative scenarios of EmailValidatorService.
 * These tests cover scenarios where the email address is considered invalid.
 */
@ExtendWith(MockitoExtension.class)
public class EmailValidatorServiceNegativeTest {

    private EmailValidatorService emailValidatorService;

    /**
     * Sets up the EmailValidatorService instance before each test.
     */
    @BeforeEach
    public void setUp() {
        emailValidatorService = new EmailValidatorService();
    }

    /**
     * Tests the behavior of EmailValidatorService when an invalid HdM email address is provided.
     */
    @Test
    public void testInvalidHdmEmail() {
        String invalidEmail = "user@hdm.de";
        assertFalse(emailValidatorService.isHdmMail(invalidEmail));
    }
}
