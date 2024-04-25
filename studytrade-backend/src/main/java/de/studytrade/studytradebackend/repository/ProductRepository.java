package de.studytrade.studytradebackend.repository;

import de.studytrade.studytradebackend.model.Product;
import de.studytrade.studytradebackend.service.ProductInterface;
import de.studytrade.studytradebackend.service.ProductService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends MongoRepository<Product, ObjectId> {
}
