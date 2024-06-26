package de.studytrade.studytradebackend.controller;

import de.studytrade.studytradebackend.model.Product;
import de.studytrade.studytradebackend.service.ProductInterface;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
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
    @Operation(summary = "Get all products", description = "Get all products which are listed in the database")
    public ResponseEntity<List<Product>> getAllProducts() {
        return new ResponseEntity<>(productService.allProducts(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get single product", description = "Get single product by id")
    public ResponseEntity<Optional<Product>> getSingleProduct(
            @PathVariable @Schema(description = "ID of the product") ObjectId id) {
        return new ResponseEntity<>(productService.singleProduct(id), HttpStatus.OK);
    }

    @GetMapping("/multiple")
    @Operation(summary = "Get multiple products", description = "Get list of products")
    public ResponseEntity<List<Product>> getMultipleProducts(
            @RequestParam(required = true) @Schema(description = "List of the IDs of the products", type = "array") List<ObjectId> id) {
        return new ResponseEntity<>(productService.getMultipleProducts(id), HttpStatus.OK);
    }

    @GetMapping("/filter")
    @Operation(summary = "Get filtered products", description = "Get all products filtered by price, condition, category and sorted by price or date")
    public ResponseEntity<List<Product>> filterProducts(
            @RequestParam(required = false) @Schema(description = "Minimum price") Float minPrice,
            @RequestParam(required = false) @Schema(description = "Maximum price") Float maxPrice,
            @RequestParam(required = false) @Schema(description = "Condition of the product", allowableValues = { "new",
                    "nearly new", "used" }) String condition,
            @RequestParam(required = false) @Schema(description = "List of categories", type = "array") List<String> category,
            @RequestParam(required = false) @Schema(description = "Sort parameters", allowableValues = { "priceASC",
                    "priceDESC", "creationDateASC", "creationDateDESC" }) String sort) {
        try {
            return new ResponseEntity<>(productService.filterProducts(minPrice, maxPrice, condition, category, sort),
                    HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/search")
    @Operation(summary = "Get searched products", description = "Get all products which match the search term")
    public ResponseEntity<List<Product>> searchProducts(
            @RequestParam(required = true) @Schema(description = "Search parameter") String search) {
        try {
            return new ResponseEntity<>(productService.searchProducts(search), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    @Operation(summary = "Add new product", description = "Add new product to the database")
    public ResponseEntity<String> addNewProduct(
            @RequestBody @Schema(description = "Product to be added") Product product) {
        try {
            productService.newProduct(product);
            return new ResponseEntity<>("Product added successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to add product: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping
    @Operation(summary = "Update existing product", description = "Update existing product in the database")
    public ResponseEntity<String> updateProduct(
            @RequestBody @Schema(description = "Product to be updated") Product productRequest) {
        try {
            productService.updateProduct(productRequest);
            return new ResponseEntity<>("Product updated successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to update product: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{productId}")
    @Operation(summary = "Delete single product", description = "Delete single product by id")
    public ResponseEntity<String> deleteProduct(
            @PathVariable @Schema(description = "ID of the product") ObjectId id) {
        try {
            productService.deleteProduct(id);
            return new ResponseEntity<>("Product deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to delete product: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
