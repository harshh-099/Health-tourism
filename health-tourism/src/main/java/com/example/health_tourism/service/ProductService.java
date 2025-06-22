package com.example.health_tourism.service;
import com.example.health_tourism.model.Product;
import com.example.health_tourism.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepo repo;

    public List<Product> getAllProducts(){
    return repo.findAll();
    }

    public Product getProductById(int id) {
        return repo.findById(id).orElse(null);
    }



    public List<Product> searchProducts(String keyword) {
        return repo.searchProducts(keyword);
    }
}
