package de.studytrade.studytradebackend.service;

import de.studytrade.studytradebackend.model.AuthUser;
import jakarta.mail.MessagingException;

import java.io.UnsupportedEncodingException;

public interface SendEmailInterface {

    void sendVerificationEmail(AuthUser user, String siteURL, String subject, String content)
            throws MessagingException, UnsupportedEncodingException;
}
