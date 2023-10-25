package com.example.TestBackend.service;
import com.example.TestBackend.exepction.UsernNotFoundException;
import com.example.TestBackend.model.Item;
import com.example.TestBackend.repo.ItemRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.ByteArrayOutputStream;
import org.w3c.dom.Document;
import org.w3c.dom.Element;



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

    public byte[] writeRidersToXML(){
        try {
            DocumentBuilderFactory documentBuilderFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder documentBuilder = documentBuilderFactory.newDocumentBuilder();

            // Tworzenie dokumentu XML
            Document document = documentBuilder.newDocument();

            Element itemsElement = document.createElement("items");
            document.appendChild(itemsElement);

            List<Item> items = itemRepo.findAll();
            for (Item item : items) {
                appendItemElement(document, itemsElement, item.getId().toString(), item.getName(), item.getCena().toString(), item.getOpis(), item.getImageUrl());
            }
            // Tworzenie obiektu Transformer do przekształcania dokumentu XML w strumień bajtów
            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();

            // Konfiguracja parametrów Transformera
            transformer.setOutputProperty(OutputKeys.ENCODING, "UTF-8");
            transformer.setOutputProperty(OutputKeys.INDENT, "yes");

            // Tworzenie strumienia bajtów do przechowywania wygenerowanego XML
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

            // Przekształcenie dokumentu XML na strumień bajtów
            transformer.transform(new DOMSource(document), new StreamResult(outputStream));

            // Pobieranie wygenerowanego XML jako tablicy bajtów
            byte[] xmlBytes = outputStream.toByteArray();

            // Zwracanie tablicy bajtów
            return xmlBytes;
        }
        catch (Exception e) {
            e.printStackTrace();
            // Obsługa wyjątków
        }
        return null;
    }
    private void appendItemElement(Document document, Element ridersElement, String id, String name, String cena, String opis, String imageUrl) {
        // Tworzenie elementu <rider>
        Element itemElement = document.createElement("item");
        ridersElement.appendChild(itemElement);

        // Tworzenie elementów <id>, <number>, <name>, <team> i dodawanie ich do <rider>
        appendElementWithValue(document, itemElement, "id", id);
        appendElementWithValue(document, itemElement, "name", name);
        appendElementWithValue(document, itemElement, "cena", cena);
        appendElementWithValue(document, itemElement, "opis", opis);
        appendElementWithValue(document, itemElement, "imageUrl", imageUrl);

    }

    private void appendElementWithValue(Document document, Element parentElement, String elementName, String value) {
        Element element = document.createElement(elementName);
        element.setTextContent(value);
        parentElement.appendChild(element);
    }

}
