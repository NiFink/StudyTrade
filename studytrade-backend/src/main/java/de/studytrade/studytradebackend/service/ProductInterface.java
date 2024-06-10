package de.studytrade.studytradebackend.service;

import de.studytrade.studytradebackend.model.Product;
import java.util.List;
import java.util.Optional;

public interface ProductInterface {
    List<Product> allProducts();

    Optional<Product> singleProduct(int productId);

    List<Product> getMultipleProducts(List<Integer> productId);

    List<Product> filterProducts(Float minPrice, Float maxPrice, String condition, List<String> category, String sort);

    List<Product> searchProducts(String search);

    void newProduct(Product product);

    Optional<Product> updateProduct(Product productRequest);

    void deleteProduct(int productId);

}
