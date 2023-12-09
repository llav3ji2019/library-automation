package org.polytech.rest.booktype;

import lombok.RequiredArgsConstructor;
import org.polytech.db.booktype.BookTypeService;
import org.polytech.db.model.BookType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/library/book_type")
@RequiredArgsConstructor
public class BookTypeController {
    private final BookTypeService service;
    private final BookTypeRequestMapper mapper;

    @GetMapping("/all")
    public List<BookType> getAllBookType() {
        return service.getAll();
    }

    @PostMapping("/add")
    public BookType addBookType(@RequestBody BookTypeRequest bookTypeRequest) {
        BookType bookType = mapper.mapRequestToDto(bookTypeRequest);
        return service.saveBookType(bookType);
    }

    @DeleteMapping("/delete")
    public void deleteBookType(@RequestBody BookTypeRequest bookTypeRequest) {
        BookType bookType = mapper.mapRequestToDto(bookTypeRequest);
        service.deleteBookType(bookType);
    }

    @PutMapping("/update")
    public BookType updateBookType(@RequestBody BookTypeRequest bookTypeRequest) {
        BookType bookType = mapper.mapRequestToDto(bookTypeRequest);
        return service.updateBookType(bookType);
    }
}
