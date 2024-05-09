package de.studytrade.studytradebackend.service;

import de.studytrade.studytradebackend.model.Product;
import de.studytrade.studytradebackend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService implements ProductInterface {
    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Product> allProducts() {
        return productRepository.findAll();
    }

    @Override
    public Optional<Product> singleProduct(int productId) {
        return productRepository.findProductByProductId(productId);
    }

    @Override
    public List<Product> filterProducts(Float minPrice, Float maxPrice, String condition, List<String> category,
            String sort) {
        // Standardwerte festlegen, falls erforderlich
        minPrice = (minPrice != null) ? minPrice : 0f;
        maxPrice = (maxPrice != null) ? maxPrice : Float.MAX_VALUE;
        condition = (condition != null) ? condition : "";
        if (condition.equals("all"))
            condition = "";

        // Sorting based on sort
        Sort sortOpt = Sort.unsorted();
        if (sort != null) {
            if (sort.equals("priceASC")) {
                sortOpt = Sort.by(Direction.ASC, "price");
            } else if (sort.equals("priceDESC")) {
                sortOpt = Sort.by(Direction.DESC, "price");
            } else if (sort.equals("creationDateASC")) {
                sortOpt = Sort.by(Direction.ASC, "creationDate");
            } else if (sort.equals("creationDateDESC")) {
                sortOpt = Sort.by(Direction.DESC, "creationDate");
            }
        }

        // Überprüfen, ob die Kategorie leer ist
        if (category == null || category.isEmpty()) {
            return productRepository.findByPriceBetweenAndConditionStartingWith(minPrice, maxPrice, condition);
        } else {
            return productRepository.findByPriceBetweenAndConditionStartingWithAndCategoryIn(minPrice, maxPrice,
                    condition,
                    category);
        }
    }

    @Override
    public List<Product> searchProducts(String search) {
        return productRepository.findByNameContainingIgnoreCase(search);
    }

    @Override
    public void newProduct(Product product) {
        Product newProduct = new Product(product);
        productRepository.insert(newProduct);
    }

    @Override
    public Optional<Product> updateProduct(Product productRequest) {
        Product existingProduct = productRepository.findProductByProductId(productRequest.getProductId()).get();

        // Change data only if it exists in productRequest
        existingProduct
                .setName(productRequest.getName() != null ? productRequest.getName() : existingProduct.getName());
        existingProduct.setDescription(productRequest.getDescription() != null ? productRequest.getDescription()
                : existingProduct.getDescription());
        existingProduct.setCategory(
                productRequest.getCategory() != null ? productRequest.getCategory() : existingProduct.getCategory());
        existingProduct.setCondition(
                productRequest.getCondition() != null ? productRequest.getCondition() : existingProduct.getCondition());
        existingProduct
                .setPrice(productRequest.getPrice() != null ? productRequest.getPrice() : existingProduct.getPrice());
        existingProduct.setImg(productRequest.getImg() != null ? productRequest.getImg() : existingProduct.getImg());

        return Optional.of(productRepository.save(existingProduct));
    }

    @Override
    public void deleteProduct(int productId) {
        productRepository.deleteByProductId(productId);
    }
}
