package com.example.TestBackend.repo;

import com.example.TestBackend.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ItemRepo extends JpaRepository<Item, Long>{
    void deleteItemtById(Long id);

    Optional<Item> findItemById (Long id);
}
