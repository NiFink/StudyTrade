package de.studytrade.studytradebackend.service;

import de.studytrade.studytradebackend.model.Product;
import org.bson.types.ObjectId;

import java.util.List;
import java.util.Optional;

public interface ProductInterface {
    List<Product> allProducts();
    Optional<Product> singleProduct(ObjectId id);
}
