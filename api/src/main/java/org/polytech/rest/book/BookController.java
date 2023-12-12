package org.polytech.rest.book;

import lombok.RequiredArgsConstructor;
import org.polytech.db.book.BookService;
import org.polytech.db.model.Book;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/library/book")
@RequiredArgsConstructor
public class BookController {
    private final BookService bookService;
    private final BookRequestMapper bookRequestMapper;
    private final BookResponseMapper bookResponseMapper;

    @GetMapping("/all")
    public ResponseEntity<List<BookResponse>> getAllBook() {
        List<Book> books = bookService.getAll();
        List<BookResponse> result = books
                .stream()
                .map(bookResponseMapper::mapToBookResponse)
                .toList();
        return ResponseEntity.ok(result);
    }

    @PostMapping("/add")
    public ResponseEntity<Book> addBook(@RequestBody BookRequest bookRequest) {
        return ResponseEntity.ok(bookService.saveBook(bookRequestMapper.mapToBookDto(bookRequest)));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable long id) {
        bookService.deleteBook(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/update")
    public ResponseEntity<Book> updateBook(@RequestBody BookRequest bookRequest) {
        return ResponseEntity.ok(bookService.updateBook(bookRequestMapper.mapToBookDto(bookRequest)));
    }
}
