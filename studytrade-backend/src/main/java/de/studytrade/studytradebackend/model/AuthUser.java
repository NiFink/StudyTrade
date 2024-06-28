package de.studytrade.studytradebackend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Document("users")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthUser {
    @Id
    private ObjectId id;
    @Indexed
    private String username;
    private String password;
    private String mail;
    private String creationDate;
    private String profileImage;
    @DocumentReference
    private List<Product> createdProducts;
    @DocumentReference
    private List<Product> favorites;
    private String verificationCode;
    private boolean isEnabled;

    public AuthUser(AuthUser user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.password = user.getPassword();
        this.mail = user.getMail();
        this.creationDate = user.getCreationDate();
        this.profileImage = user.getProfileImage();
        this.createdProducts = user.getCreatedProducts();
        this.favorites = user.getFavorites();
        this.verificationCode = user.getVerificationCode();
        this.isEnabled = user.isEnabled();
    }
}
