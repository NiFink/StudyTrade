package de.studytrade.studytradebackend.service;

import de.studytrade.studytradebackend.model.AuthUser;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;

@Service
public class SendEmailService implements SendEmailInterface{

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendVerificationEmail(AuthUser user, String siteURL, String subject, String content)
            throws MessagingException, UnsupportedEncodingException {

        String toAddress = user.getMail();
        String fromAddress = "k24731136@gmail.com";
        String senderName = "StudyTrade";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getUsername());
        String verifyURL = siteURL + "/verify?code=" + user.getVerificationCode();

        content = content.replace("[[URL]]", verifyURL);

        helper.setText(content, true);

        mailSender.send(message);

    }
}

