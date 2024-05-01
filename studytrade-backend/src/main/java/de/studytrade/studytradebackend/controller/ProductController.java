package de.studytrade.studytradebackend.controller;

import de.studytrade.studytradebackend.model.Product;
import de.studytrade.studytradebackend.service.ProductInterface;
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

    @GetMapping("/filter")
    public ResponseEntity<List<Product>> filterProducts(@RequestParam(required = false) Float minPrice,
            @RequestParam(required = false) Float maxPrice, @RequestParam(required = false) String condition,
            @RequestParam(required = false) List<String> category) {
        try {
            return new ResponseEntity<>(productService.filterProducts(minPrice, maxPrice, condition, category),
                    HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<Product>> filterProducts(@RequestParam(required = true) String search) {
        try {
            return new ResponseEntity<>(productService.searchProducts(search),
                    HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    public ResponseEntity<String> addNewProduct(@RequestBody Product product) {
        try {
            productService.newProduct(product);
            return new ResponseEntity<>("Product added successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to add product: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping
    public ResponseEntity<String> updateProduct(@RequestBody Product productRequest) {
        try {
            productService.updateProduct(productRequest);
            return new ResponseEntity<>("Product updated successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to update product: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<String> deleteProduct(@PathVariable int productId) {
        try {
            productService.deleteProduct(productId);
            return new ResponseEntity<>("Product deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to delete product: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
