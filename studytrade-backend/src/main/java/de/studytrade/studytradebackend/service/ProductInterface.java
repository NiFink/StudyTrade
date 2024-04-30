package de.studytrade.studytradebackend.service;

import de.studytrade.studytradebackend.model.Product;
import java.util.List;
import java.util.Optional;

public interface ProductInterface {
    List<Product> allProducts();

    Optional<Product> singleProduct(int productId);

    List<Product> filterProducts(Float minPrice, Float maxPrice, String condition, List<String> category);

    void newProduct(Product product);

    Optional<Product> updateProduct(Product productRequest);

    void deleteProduct(int productId);
}
