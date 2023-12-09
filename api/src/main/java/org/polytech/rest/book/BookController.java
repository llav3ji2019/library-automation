package org.polytech.rest.book;

import lombok.RequiredArgsConstructor;
import org.polytech.db.book.BookService;
import org.polytech.db.model.Book;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/library/book")
@RequiredArgsConstructor
public class BookController {
    private final BookService bookService;
    private final BookRequestMapper bookRequestMapper;

    @GetMapping("/all")
    public List<Book> getAllBook() {
        return bookService.getAll();
    }

    @PostMapping("/add")
    public Book addBook(@RequestBody BookRequest bookRequest) {
        return bookService.saveBook(bookRequestMapper.mapToBookDto(bookRequest));
    }

    @DeleteMapping("/delete")
    public void deleteBook(@RequestBody BookRequest bookRequest) {
        bookService.deleteBook(bookRequestMapper.mapToBookDto(bookRequest));
    }

    @PutMapping("/update")
    public Book updateBook(@RequestBody BookRequest bookRequest) {
        return bookService.updateBook(bookRequestMapper.mapToBookDto(bookRequest));
    }
}
