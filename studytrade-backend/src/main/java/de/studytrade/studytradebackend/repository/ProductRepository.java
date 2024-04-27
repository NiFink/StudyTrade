package de.studytrade.studytradebackend.repository;

import de.studytrade.studytradebackend.model.Product;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends MongoRepository<Product, ObjectId> {
    Optional<Product> findProductByProductId(int productId);
    void deleteByProductId(int productId);
}
