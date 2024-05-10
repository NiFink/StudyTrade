package de.studytrade.studytradebackend.service;

import de.studytrade.studytradebackend.model.Product;
import de.studytrade.studytradebackend.model.User;
import java.util.List;
import java.util.Optional;

public interface UserInterface {
    List<User> allUsers();

    void addUser(User user);

    Optional<User> singleUser(int userId);

    List<Product> favorites(int userId);

    Optional<User> updateUser(User userRequest);

    void updateFavorites(int userId, int productId);

    void deleteUser(int userId);

    void deleteFavorite(int userId, int productId);
}
