package org.polytech.rest.book;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.polytech.db.book.BookService;
import org.polytech.db.model.Book;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/library/book")
@RequiredArgsConstructor
@Tag(name="Book Controller", description="Контроллер для удаления, редактирования, добавления и получения всех книг")
public class BookController {
    private final BookService bookService;
    private final BookRequestMapper bookRequestMapper;
    private final BookResponseMapper bookResponseMapper;

    @GetMapping("/all")
    @Operation(
            summary = "Получение всех книг",
            description = "Позволяет получить все данные о книгах, содерщщихся в библиотеке"
    )
    public ResponseEntity<List<BookResponse>> getAllBook() {
        List<Book> books = bookService.getAll();
        List<BookResponse> result = books
                .stream()
                .map(bookResponseMapper::mapToBookResponse)
                .toList();
        return ResponseEntity.ok(result);
    }

    @PostMapping("/add")
    @Operation(
            summary = "Добавление книги",
            description = "Позволяет добавить новую книгу в библиотеку"
    )
    public ResponseEntity<Book> addBook(@RequestBody BookRequest bookRequest) {
        return ResponseEntity.ok(bookService.saveBook(bookRequestMapper.mapToBookDto(bookRequest)));
    }

    @DeleteMapping("/delete/{id}")
    @Operation(
            summary = "Удаление книги",
            description = "Позволяет удалить книгу с конкретным id из библиотеки. Id будет взят из url"
    )
    public ResponseEntity<?> deleteBook(@PathVariable @Min(1) @Parameter(description = "Идентификатор книги для удаления") long id) {
        bookService.deleteBook(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/update")
    @Operation(
            summary = "Редактирование книги",
            description = "Позволяет редактировать книгу хранящуюся в библиотеке. Все данные для изменения будут переданы в теле запроса"
    )
    public ResponseEntity<Book> updateBook(@RequestBody BookRequest bookRequest) {
        return ResponseEntity.ok(bookService.updateBook(bookRequestMapper.mapToBookDto(bookRequest)));
    }
}
