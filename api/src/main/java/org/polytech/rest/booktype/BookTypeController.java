package org.polytech.rest.booktype;

import lombok.RequiredArgsConstructor;
import org.polytech.db.booktype.BookTypeService;
import org.polytech.db.model.BookType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/library/book_type")
@RequiredArgsConstructor
public class BookTypeController {
    private final BookTypeService service;
    private final BookTypeRequestMapper mapper;

    @GetMapping("/all")
    public ResponseEntity<List<BookTypeRequest>> getAllBookType() {
        List<BookTypeRequest> result = service.getAll().stream().map(mapper::mapBookTypeToRequest).toList();
        return ResponseEntity.ok(result);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addBookType(@RequestBody BookTypeRequest bookTypeRequest) {
        BookType bookType = mapper.mapRequestToDto(bookTypeRequest);
        service.saveBookType(bookType);
        return ResponseEntity.ok("OK");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBookType(@PathVariable long id) {
        service.deleteBookType(id);
        return ResponseEntity.ok("OK");
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateBookType(@RequestBody BookTypeRequest bookTypeRequest) {
        BookType bookType = mapper.mapRequestToDto(bookTypeRequest);
        mapper.mapBookTypeToRequest(service.updateBookType(bookType));
        return ResponseEntity.ok("OK");
    }
}
