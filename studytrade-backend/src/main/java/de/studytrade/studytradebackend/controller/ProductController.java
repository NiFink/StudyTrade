package de.studytrade.studytradebackend.controller;

import de.studytrade.studytradebackend.model.Product;
import de.studytrade.studytradebackend.service.ProductInterface;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {
    @Autowired
    private ProductInterface productService;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return new ResponseEntity<List<Product>>(productService.allProducts(), HttpStatus.OK);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<Optional<Product>> getSingleProduct(@PathVariable int productId) {
        return new ResponseEntity<Optional<Product>>(productService.singleProduct(productId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<String> addNewProduct(@RequestBody Product product){
        try{
            productService.newProduct(product);
            return new ResponseEntity<>("Product added successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to add product: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
