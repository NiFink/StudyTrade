package de.studytrade.studytradebackend.service;

import de.studytrade.studytradebackend.model.Product;
import de.studytrade.studytradebackend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService implements ProductInterface{
    @Autowired
    private ProductRepository productRepository;
    @Override
    public List<Product> allProducts(){
        return productRepository.findAll();
    }
}
