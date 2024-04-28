package de.studytrade.studytradebackend.service;

import de.studytrade.studytradebackend.model.Product;
import de.studytrade.studytradebackend.model.User;
import de.studytrade.studytradebackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserInterface {
    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> allUsers() {
        return userRepository.findAll();
    }

    @Override
    public void addUser(User user) {
        User newUser = new User(user);
        userRepository.insert(newUser);
    }

    @Override
    public Optional<User> singleUser(int userId) {
        return userRepository.findUserByUserId(userId);
    }

    @Override
    public Optional<User> updateUser(User userRequest) {
        User existingUser = userRepository.findUserByUserId(userRequest.getUserId()).get();
        existingUser.setUserName(userRequest.getUserName());
        existingUser.setPassword(userRequest.getPassword());
        existingUser.setMail(userRequest.getMail());
        existingUser.setCreationDate(userRequest.getCreationDate());
        existingUser.setProfileImage(userRequest.getProfileImage());
        existingUser.setFavorites(userRequest.getFavorites());
        return Optional.of(userRepository.save(existingUser));
    }

    @Override
    public void deleteUser(int userId) {
        userRepository.deleteByUserId(userId);
    }
}
