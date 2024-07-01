package de.studytrade.studytradebackend.service.interfaces;

import de.studytrade.studytradebackend.model.Product;
import org.bson.types.ObjectId;

import java.util.List;
import java.util.Optional;

public interface ProductInterface {
    List<Product> allProducts();

    Optional<Product> singleProduct(ObjectId productId);

    List<Product> getMultipleProducts(List<ObjectId> productId);

    List<Product> filterProducts(Float minPrice, Float maxPrice, String condition, List<String> category, String sort);

    List<Product> searchProducts(String search);

    void newProduct(Product product);

    Optional<Product> updateProduct(Product productRequest);

    void deleteProduct(ObjectId productId);

}
