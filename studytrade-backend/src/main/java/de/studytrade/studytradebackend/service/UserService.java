package de.studytrade.studytradebackend.service;

import de.studytrade.studytradebackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserInterface{
    @Autowired
    private UserRepository userRepository;
}
