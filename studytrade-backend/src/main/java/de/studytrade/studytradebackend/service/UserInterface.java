package de.studytrade.studytradebackend.service;

import de.studytrade.studytradebackend.model.AuthUser;
import jakarta.mail.MessagingException;
import org.bson.types.ObjectId;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;

public interface UserInterface {
    List<AuthUser> allUsers();

    void addUser(AuthUser user, String siteURL) throws UnsupportedEncodingException, MessagingException;

    Optional<AuthUser> singleUser(ObjectId userId);

    List<Integer> favorites(ObjectId userId);

    Optional<AuthUser> updateUser(AuthUser userRequest);

    void updateFavorites(ObjectId userId, int productId);

    void deleteUser(ObjectId userId);

    void deleteFavorite(ObjectId userId, int productId);

    boolean userExists(AuthUser user);

    boolean verify(String verificationCode);
}
