package de.studytrade.studytradebackend.service;

import de.studytrade.studytradebackend.model.AuthUser;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;
import java.util.Optional;

public interface UserInterface {
    List<AuthUser> allUsers();

    boolean addUser(AuthUser user);

    Optional<AuthUser> singleUser(int userId);

    List<Integer> favorites(int userId);

    Optional<AuthUser> updateUser(AuthUser userRequest);

    void updateFavorites(int userId, int productId);

    void deleteUser(int userId);

    void deleteFavorite(int userId, int productId);


}
