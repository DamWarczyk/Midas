package com.example.TestBackend.service;
import com.example.TestBackend.exepction.UsernNotFoundException;
import com.example.TestBackend.model.Item;
import com.example.TestBackend.repo.ItemRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {
    private  final ItemRepo itemRepo;

    @Autowired
    public ItemService(ItemRepo itemRepo) {
        this.itemRepo = itemRepo;
    }

    public Item addItem(Item item){
        return  itemRepo.save(item);
    }

    public List<Item> findAllItem(){return itemRepo.findAll();}

    public Item updateItem(Item newItem, Long id){
        return itemRepo.findById(id)
            .map(item -> {
                item.setOpis(newItem.getOpis());
                item.setCena(newItem.getCena());
                item.setName(newItem.getName());
                item.setImageUrl(newItem.getImageUrl());
                return itemRepo.save(item);
            })
            .orElseGet(() -> {
                newItem.setId(id);
                return itemRepo.save(newItem);
            });
    }

    public Item findItemById(Long id){
        return  itemRepo.findItemById(id).orElseThrow(() -> new UsernNotFoundException("User by id: " + id + "Not found"));
    }

    public void deleteItem(Long id){itemRepo.deleteItemtById(id);}

    public void buyItem(Long id){itemRepo.deleteItemtById(id);}

}
