package de.studytrade.studytradebackend.service;

import de.studytrade.studytradebackend.model.AuthUser;
import jakarta.mail.MessagingException;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;

public interface UserInterface {
    List<AuthUser> allUsers();

    void addUser(AuthUser user, String siteURL) throws UnsupportedEncodingException, MessagingException;

    Optional<AuthUser> singleUser(int userId);

    List<Integer> favorites(int userId);

    Optional<AuthUser> updateUser(AuthUser userRequest);

    void updateFavorites(int userId, int productId);

    void deleteUser(int userId);

    void deleteFavorite(int userId, int productId);

    boolean userExists(AuthUser user);

    boolean verify(String verificationCode);
}
