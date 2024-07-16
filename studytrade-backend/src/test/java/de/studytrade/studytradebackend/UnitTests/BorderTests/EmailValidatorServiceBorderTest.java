package de.studytrade.studytradebackend.UnitTests.BorderTests;

import de.studytrade.studytradebackend.service.EmailValidatorService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;

/**
 * Unit tests for boundary conditions of EmailValidatorService.
 * These tests cover scenarios where the email address does not meet expected format criteria.
 */
public class EmailValidatorServiceBorderTest {

    private EmailValidatorService emailValidatorService;

    /**
     * Sets up the EmailValidatorService instance before each test.
     */
    @BeforeEach
    public void setUp() {
        emailValidatorService = new EmailValidatorService();
    }

    /**
     * Tests the behavior of EmailValidatorService when the email address lacks a domain part.
     */
    @Test
    public void testEmailWithoutDomain() {
        String emailWithoutDomain = "user@";
        assertFalse(emailValidatorService.isHdmMail(emailWithoutDomain));
    }

    /**
     * Tests the behavior of EmailValidatorService when the email address lacks an '@' symbol.
     */
    @Test
    public void testEmailWithoutAtSymbol() {
        String emailWithoutAtSymbol = "userhdm-stuttgart.de";
        assertFalse(emailValidatorService.isHdmMail(emailWithoutAtSymbol));
    }

    /**
     * Tests the behavior of EmailValidatorService when the email address contains a subdomain.
     */
    @Test
    public void testEmailWithSubdomain() {
        String emailWithSubdomain = "user@sub.hdm-stuttgart.de";
        assertFalse(emailValidatorService.isHdmMail(emailWithSubdomain));
    }
}
