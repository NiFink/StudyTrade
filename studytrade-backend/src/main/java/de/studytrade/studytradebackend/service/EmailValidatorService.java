package de.studytrade.studytradebackend.service;

import org.springframework.stereotype.Service;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class EmailValidatorService implements EmailValidatorInterface{

    @Override
    public boolean isHdmMail(String email) {

        String emailPattern = "^\\w+@hdm-stuttgart\\.de$";

        Pattern pattern = Pattern.compile(emailPattern);

        Matcher matcher = pattern.matcher(email);

        return matcher.matches();
    }
}
