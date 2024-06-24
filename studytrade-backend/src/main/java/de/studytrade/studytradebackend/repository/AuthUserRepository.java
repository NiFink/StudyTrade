package de.studytrade.studytradebackend.repository;

import de.studytrade.studytradebackend.model.AuthUser;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthUserRepository extends MongoRepository<AuthUser, ObjectId> {
    Optional<AuthUser> findAuthUserById(ObjectId userId);

    Optional<AuthUser> findByUsername(String username);

    boolean existsUserByUsername(String username);

    void deleteById(ObjectId userId);

    Optional<AuthUser> findAuthUserByVerificationCode(String code);
}
