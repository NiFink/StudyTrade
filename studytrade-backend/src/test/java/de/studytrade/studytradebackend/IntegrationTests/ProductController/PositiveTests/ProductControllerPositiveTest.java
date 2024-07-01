package de.studytrade.studytradebackend.IntegrationTests.ProductController.PositiveTests;

import de.studytrade.studytradebackend.controller.ProductController;

import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import de.studytrade.studytradebackend.model.Product;
import de.studytrade.studytradebackend.service.interfaces.ProductInterface;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.*;

@ExtendWith(SpringExtension.class)
class ProductControllerPositiveTest {

    @InjectMocks
    private ProductController productController;

    @Mock
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
        product1.setImg("product1.jpg");
        product1.setCreationDate(new Date());

        Product product2 = new Product();
        product2.setName("Product2");
        product2.setDescription("Description2");
        product2.setCategory(List.of("Electronic"));
        product2.setCondition("Used");
        product2.setPrice(29.99f);
        product2.setImg("product2.jpg");
        product2.setCreationDate(new Date());

        products.add(new Product(product1));
        products.add(new Product(product2));

        when(productService.allProducts()).thenReturn(products);

        ResponseEntity<List<Product>> response = productController.getAllProducts();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(products, response.getBody());

        verify(productService, times(1)).allProducts();
    }

    @Test
    public void testGetSingleProduct() {
        Product product = new Product();
        product.setName("Product1");
        product.setDescription("Description1");

        ObjectId productId = new ObjectId();

        when(productService.singleProduct(any(ObjectId.class))).thenReturn(Optional.of(product));

        ResponseEntity<Optional<Product>> response = productController.getSingleProduct(productId);

        assertEquals(HttpStatus.OK, response.getStatusCode());

        verify(productService, times(1)).singleProduct(any(ObjectId.class));

    }

    @Test
    public void testGetMultipleProducts() {
        List<Product> products = new ArrayList<>();
        Product product1 = new Product();
        product1.setName("Product1");
        product1.setDescription("Description1");
        product1.setCategory(Arrays.asList("Clothing", "Home"));
        product1.setCondition("New");
        product1.setPrice(50.99f);
        product1.setImg("product1.jpg");
        product1.setCreationDate(new Date());

        Product product2 = new Product();
        product2.setName("Product2");
        product2.setDescription("Description2");
        product2.setCategory(List.of("Electronic"));
        product2.setCondition("Used");
        product2.setPrice(29.99f);
        product2.setImg("product2.jpg");
        product2.setCreationDate(new Date());

        products.add(new Product(product1));
        products.add(new Product(product2));

        List<ObjectId> ids = new ArrayList<>();

        when(productService.getMultipleProducts(any(List.class))).thenReturn(products);

        ResponseEntity<List<Product>> response = productController.getMultipleProducts(ids);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(products, response.getBody());

        verify(productService, times(1)).getMultipleProducts(ids);
    }

}
