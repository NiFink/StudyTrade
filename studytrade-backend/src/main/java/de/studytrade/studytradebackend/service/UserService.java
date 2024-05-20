package de.studytrade.studytradebackend.service;

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
    public List<Integer> favorites(int userId) {
        return userRepository.findUserByUserId(userId).get().getFavorites();
    }

    @Override
    public Optional<User> updateUser(User userRequest) {
        User existingUser = userRepository.findUserByUserId(userRequest.getUserId()).get();

        // Change data only if it exists in userRequest
        existingUser.setUserName(
                userRequest.getUserName() != null ? userRequest.getUserName() : existingUser.getUserName());
        existingUser.setPassword(
                userRequest.getPassword() != null ? userRequest.getPassword() : existingUser.getPassword());
        existingUser.setMail(userRequest.getMail() != null ? userRequest.getMail() : existingUser.getMail());
        existingUser.setProfileImage(
                userRequest.getProfileImage() != null ? userRequest.getProfileImage() : existingUser.getProfileImage());
        existingUser.setFavorites(
                userRequest.getFavorites() != null ? userRequest.getFavorites() : existingUser.getFavorites());

        return Optional.of(userRepository.save(existingUser));
    }

    @Override
    public void updateFavorites(int userId, int productId) {
        User user = userRepository.findUserByUserId(userId).get();
        user.getFavorites().add(productId);
        userRepository.save(user);
    }

    @Override
    public void deleteUser(int userId) {
        userRepository.deleteByUserId(userId);
    }

    @Override
    public void deleteFavorite(int userId, int productId) {
        User user = userRepository.findUserByUserId(userId).get();
        user.getFavorites().remove(user.getFavorites().indexOf(productId));
        userRepository.save(user);
    }
}
