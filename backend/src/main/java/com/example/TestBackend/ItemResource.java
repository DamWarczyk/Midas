package com.example.TestBackend;
import com.example.TestBackend.model.Item;
import  com.example.TestBackend.service.ItemService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/item")
public class ItemResource {
    private final ItemService itemService;

    public ItemResource(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping("/all")
    //@CrossOrigin("http://localhost:4200")
    public ResponseEntity<List<Item>> getAllItem(){
        List<Item> items = itemService.findAllItem();
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    @CrossOrigin("http://localhost:4200")
    public ResponseEntity<Item> getItemById(@PathVariable("id") Long id){
        Item items = itemService.findItemById(id);
        return new ResponseEntity<>(items,HttpStatus.OK);
    }

    @PostMapping("/add")
    @CrossOrigin("http://localhost:4200")
    public ResponseEntity<Item> postItem( @RequestBody Item item){
        Item item1 = itemService.addItem(item);
        return  new ResponseEntity<>(item1, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    @CrossOrigin("http://localhost:4200")
    public ResponseEntity<Item> updateItem( @RequestBody Item item, @PathVariable Long id){
        Item updateItem = itemService.updateItem(item, id);
        return new ResponseEntity<>(updateItem, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    @CrossOrigin("http://localhost:4200")
    @Transactional
    public ResponseEntity<?> deleteItem ( @PathVariable("id") Long id){
        itemService.deleteItem(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/buyItem/{id}")
    @CrossOrigin("http://localhost:4200")
    @Transactional
    public ResponseEntity<?> buyItem ( @PathVariable("id") Long id){
        itemService.deleteItem(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //eksport do xml
    @GetMapping("/export/xml")
    @CrossOrigin("http://localhost:4200")
    public ResponseEntity<String> exportRidersToXML() {
        List<Item> items = itemService.findAllItem();
        String xmlFilePath = "items.xml";

        try (FileWriter writer = new FileWriter(xmlFilePath)) {
            // nagówek i ele główny
            writer.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
            writer.append("<items>\n");

            // zapis do ele xml
            for (Item item : items) {
                writer.append(String.format("  <item>\n    <number>%d</number>\n    <name>%s</name>\n <cena>%d</cena>\n <opis>%s</opis>\n <imageUrl>%s</imageUrl>\n  </item>\n",
                        item.getId(), item.getName(), item.getCena(), item.getOpis(),item.getImageUrl()));
            }

            // zamknięcie elementu
            writer.append("</items>");

            writer.flush();
        } catch (IOException e) {
            return new ResponseEntity<>("Blad eksportu do xml", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>("Wykonano eksport do xml.", HttpStatus.OK);
    }

    @GetMapping(value = "/xml", produces = MediaType.APPLICATION_XML_VALUE)
    public ResponseEntity<byte[]> generateRidersXmlBlob() {
        byte[] xmlBlob = itemService.writeRidersToXML();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_XML);
        headers.setContentLength(xmlBlob.length);
        headers.setCacheControl("no-cache");

        return new ResponseEntity<>(xmlBlob, headers, HttpStatus.OK);
    }
}
