package com.example.TestBackend.service;

import com.example.TestBackend.exepction.UsernNotFoundException;
import com.example.TestBackend.model.Item;
import com.example.TestBackend.repo.ItemRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

public class ItemServiceTest {

    private ItemService itemService;

    @Mock
    private ItemRepo itemRepo;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        itemService = new ItemService(itemRepo);
    }

    @Test
    public void testAddItem() {
        Item item = new Item();
        item.setName("Test Item");
        item.setCena(100L);
        item.setOpis("Test description");
        item.setImageUrl("test-image.jpg");

        when(itemRepo.save(item)).thenReturn(item);

        Item savedItem = itemService.addItem(item);

        assertEquals("Test Item", savedItem.getName());
        assertEquals(100L, savedItem.getCena());
        assertEquals("Test description", savedItem.getOpis());
        assertEquals("test-image.jpg", savedItem.getImageUrl());
    }

    @Test
    public void testFindAllItem() {
        List<Item> itemList = new ArrayList<>();
        when(itemRepo.findAll()).thenReturn(itemList);

        List<Item> result = itemService.findAllItem();

        assertEquals(0, result.size());
    }

    @Test
    public void testUpdateItem() {
        Long itemId = 1L;
        Item existingItem = new Item();
        existingItem.setId(itemId);
        existingItem.setName("Existing Item");
        existingItem.setCena(50L);
        existingItem.setOpis("Existing description");
        existingItem.setImageUrl("existing-image.jpg");

        Item newItem = new Item();
        newItem.setName("Updated Item");
        newItem.setCena(75L);
        newItem.setOpis("Updated description");
        newItem.setImageUrl("updated-image.jpg");

        when(itemRepo.findById(itemId)).thenReturn(Optional.of(existingItem));
        when(itemRepo.save(existingItem)).thenReturn(existingItem);

        Item updatedItem = itemService.updateItem(newItem, itemId);

        assertEquals("Updated Item", updatedItem.getName());
        assertEquals(75L, updatedItem.getCena());
        assertEquals("Updated description", updatedItem.getOpis());
        assertEquals("updated-image.jpg", updatedItem.getImageUrl());
    }

    @Test
    public void testUpdateItemWithNonExistingItem() {
        Long itemId = 1L;
        Item newItem = new Item();
        when(itemRepo.findById(itemId)).thenReturn(Optional.empty());
        when(itemRepo.save(newItem)).thenReturn(newItem);

        Item updatedItem = itemService.updateItem(newItem, itemId);

        assertEquals(newItem, updatedItem);
    }

    @Test
    public void testFindItemById() {
        Long itemId = 1L;
        Item item = new Item();
        item.setId(itemId);

        when(itemRepo.findItemById(itemId)).thenReturn(Optional.of(item));

        Item foundItem = itemService.findItemById(itemId);

        assertEquals(itemId, foundItem.getId());
    }

    @Test
    public void testFindItemByIdWithNonExistingItem() {
        Long itemId = 1L;
        when(itemRepo.findItemById(itemId)).thenReturn(Optional.empty());

        assertThrows(UsernNotFoundException.class, () -> itemService.findItemById(itemId));
    }

    @Test
    public void testDeleteItem() {
        Long itemId = 1L;
        doNothing().when(itemRepo).deleteItemtById(itemId);

        itemService.deleteItem(itemId);

        verify(itemRepo, times(1)).deleteItemtById(itemId);
    }

    @Test
    public void testBuyItem() {
        Long itemId = 1L;
        doNothing().when(itemRepo).deleteItemtById(itemId);

        itemService.buyItem(itemId);

        verify(itemRepo, times(1)).deleteItemtById(itemId);
    }
}
