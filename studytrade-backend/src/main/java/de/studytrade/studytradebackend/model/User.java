package de.studytrade.studytradebackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.Date;
import java.util.List;

@Document(collection = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    private ObjectId id;
    private int userId;
    private String userName;
    private String password;
    private String mail;
    private Date creationDate;
    private String profileImage;
    private List<Integer> favorites;

    public User(User user) {
        this.userId = user.getUserId();
        this.userName = user.getUserName();
        this.password = user.getPassword();
        this.mail = user.getMail();
        this.creationDate = user.getCreationDate();
        this.profileImage = user.getProfileImage();
        this.favorites = user.getFavorites();
    }
}
