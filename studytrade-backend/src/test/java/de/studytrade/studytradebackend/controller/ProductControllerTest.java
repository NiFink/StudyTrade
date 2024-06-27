package de.studytrade.studytradebackend.controller;

import de.studytrade.studytradebackend.service.ProductInterface;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import de.studytrade.studytradebackend.model.Product;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.*;

@SpringBootTest
class ProductControllerTest {

    @Autowired
    private ProductController productController;

    @MockBean
    private ProductInterface productService;

    @Test
    public void testGetAllProducts() {
        List<Product> products = new ArrayList<>();
        Product product1 = new Product();
        product1.setName("Product1");
        product1.setDescription("Description1");
        product1.setCategory(Arrays.asList("Clothing", "Home"));
        product1.setCondition("New");
        product1.setPrice(50.99f);
        product1.setImg("product1.jpg");;
        product1.setCreationDate(new Date());
        // product1.setUserId(123);

        Product product2 = new Product();
        product2.setName("Product2");
        product2.setDescription("Description2");
        product2.setCategory(List.of("Electronic"));
        product2.setCondition("Used");
        product2.setPrice(29.99f);
        product2.setImg("product2.jpg");
        product2.setCreationDate(new Date());
        // product2.setUserId(456);

        products.add(new Product(product1));
        products.add(new Product(product2));
        when(productService.allProducts()).thenReturn(products);

        ResponseEntity<List<Product>> response = productController.getAllProducts();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(products, response.getBody());
    }

}
