package de.studytrade.studytradebackend.service.interfaces;

import de.studytrade.studytradebackend.model.AuthUser;
import de.studytrade.studytradebackend.model.Product;
import jakarta.mail.MessagingException;
import org.bson.types.ObjectId;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;

public interface UserInterface {
    List<AuthUser> allUsers();

    void addUser(AuthUser user, String siteURL) throws UnsupportedEncodingException, MessagingException;

    Optional<AuthUser> singleUser(ObjectId userId);

    List<Product> favorites(ObjectId userId);

    Optional<AuthUser> updateUser(AuthUser userRequest);

    void updateFavorites(ObjectId userId, ObjectId productId);

    void deleteUser(ObjectId userId);

    void deleteFavorite(ObjectId userId, ObjectId productId);

    boolean userExists(AuthUser user);

    boolean verify(String verificationCode);
}
