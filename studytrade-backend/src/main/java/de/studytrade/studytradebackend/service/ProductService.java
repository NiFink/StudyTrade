package de.studytrade.studytradebackend.service;

import de.studytrade.studytradebackend.model.Product;
import de.studytrade.studytradebackend.repository.ProductRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
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
    public void newProduct(Product product) {
        Product newProduct = new Product(product);
        productRepository.insert(newProduct);
    }

    @Override
    public Optional<Product> updateProduct(Product productRequest) {
        Product existingProduct = productRepository.findProductByProductId(productRequest.getProductId()).get();
        existingProduct.setName(productRequest.getName());
        existingProduct.setDescription(productRequest.getDescription());
        existingProduct.setCategory(productRequest.getCategory());
        existingProduct.setCondition(productRequest.getCondition());
        existingProduct.setPrice(productRequest.getPrice());
        existingProduct.setImg(productRequest.getImg());
        existingProduct.setCreationDate(productRequest.getCreationDate());
        return Optional.of(productRepository.save(existingProduct));
    }

    @Override
    public void deleteProduct(int productId) {
        productRepository.deleteByProductId(productId);
    }
}
