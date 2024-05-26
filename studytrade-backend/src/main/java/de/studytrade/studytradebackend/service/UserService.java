package de.studytrade.studytradebackend.service;

import de.studytrade.studytradebackend.model.AuthUser;
import de.studytrade.studytradebackend.repository.AuthUserRepository;
import jakarta.mail.MessagingException;
import lombok.AllArgsConstructor;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService implements UserInterface {
    @Autowired
    private AuthUserRepository userRepository;

    @Autowired
    private SendEmailInterface sendEmailService;

    @Autowired
    private final PasswordEncoder passwordEncoder;

    public void addUser(AuthUser user, String siteURL) throws UnsupportedEncodingException, MessagingException {

        if (user.getCreationDate() == null) {
            user.setCreationDate(new Date(System.currentTimeMillis() + 3600000 * 2));
        }
        if (user.getProfileImage() == null) {
            user.setProfileImage(user.getUserId() + ".jpg");
        }

        user.setUserId(userRepository.findAll().get(userRepository.findAll().size() - 1).getUserId() + 1);
        user.setUsername(user.getUsername().toLowerCase());
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        String randomCode = RandomString.make(64);
        user.setVerificationCode(randomCode);
        user.setEnabled(false);

        userRepository.save(user);

        sendEmail(user,siteURL);

    }

    private void sendEmail(AuthUser user, String siteURL) throws MessagingException, UnsupportedEncodingException {
        String subject = "Please verify your registration";
        String content = "Dear [[name]],<br>"
                + "Please click the link below to verify your registration:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY</a></h3>"
                + "Thank you,<br>"
                + "Your StudyTrade Team.";

        sendEmailService.sendVerificationEmail(user, siteURL,subject, content);

    }

    public boolean verify(String verificationCode) {
        Optional<AuthUser> optionalUser = userRepository.findAuthUserByVerificationCode(verificationCode);

        if (optionalUser.isEmpty() || optionalUser.get().isEnabled()) {
            return false;
        } else {
            AuthUser user = optionalUser.get();
            user.setVerificationCode(null);
            user.setEnabled(true);
            userRepository.save(user);

            return true;
        }
    }

    @Override
    public List<AuthUser> allUsers() {
        return userRepository.findAll();
    }

    @Override
    public boolean userExists(AuthUser user){
        if(!userRepository.existsUserByUsername(user.getUsername())){
            return false;
        }
        return true;
    }

    @Override
    public Optional<AuthUser> singleUser(int userId) {
        return userRepository.findUserByUserId(userId);
    }

    @Override
    public List<Integer> favorites(int userId) {
        return userRepository.findUserByUserId(userId).get().getFavorites();
    }

    @Override
    public Optional<AuthUser> updateUser(AuthUser userRequest) {
        AuthUser existingUser = userRepository.findUserByUserId(userRequest.getUserId()).get();

        // Change data only if it exists in userRequest
        existingUser.setUsername(
                userRequest.getUsername() != null ? userRequest.getUsername() : existingUser.getUsername());
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
        AuthUser user = userRepository.findUserByUserId(userId).get();
        user.getFavorites().add(productId);
        userRepository.save(user);
    }

    @Override
    public void deleteUser(int userId) {
        userRepository.deleteByUserId(userId);
    }

    @Override
    public void deleteFavorite(int userId, int productId) {
        AuthUser user = userRepository.findUserByUserId(userId).get();
        user.getFavorites().remove(user.getFavorites().indexOf(productId));
        userRepository.save(user);
    }
}
