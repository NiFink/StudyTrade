package de.studytrade.studytradebackend.repository;

import de.studytrade.studytradebackend.model.Product;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends MongoRepository<Product, ObjectId> {
        Optional<Product> findProductById(ObjectId productId);

        List<Product> findByIdIn(List<ObjectId> productId);

        List<Product> findByPriceBetweenAndConditionStartingWith(Float minPrice, Float maxPrice,
                        String condition);

        List<Product> findByPriceBetweenAndConditionStartingWithAndCategoryIn(Float minPrice, Float maxPrice,
                        String condition,
                        List<String> category, Sort sortOpt);

        List<Product> findByNameContainingIgnoreCase(String search);

        void deleteById(@NonNull ObjectId productId);
}
