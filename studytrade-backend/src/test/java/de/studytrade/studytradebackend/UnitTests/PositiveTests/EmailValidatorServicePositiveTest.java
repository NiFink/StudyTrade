package de.studytrade.studytradebackend.UnitTests.PositiveTests;

import de.studytrade.studytradebackend.service.EmailValidatorService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Unit tests for positive scenarios of EmailValidatorService.
 * These tests cover scenarios where the email address is considered valid.
 */
public class EmailValidatorServicePositiveTest {

    private EmailValidatorService emailValidatorService;

    /**
     * Sets up the EmailValidatorService instance before each test.
     */
    @BeforeEach
    public void setUp() {
        emailValidatorService = new EmailValidatorService();
    }

    /**
     * Tests the behavior of EmailValidatorService when a valid HdM email address is provided.
     */
    @Test
    public void testValidHdmEmail() {
        String validEmail = "user@hdm-stuttgart.de";
        assertTrue(emailValidatorService.isHdmMail(validEmail));
    }
}
