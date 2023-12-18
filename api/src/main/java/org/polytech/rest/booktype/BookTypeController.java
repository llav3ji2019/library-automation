package org.polytech.rest.booktype;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.polytech.db.booktype.BookTypeService;
import org.polytech.db.model.BookType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/library/book_type")
@RequiredArgsConstructor
@Tag(name="Book Type Controller", description="Контроллер для удаления, редактирования, добавления и получения всех типов книг")
public class BookTypeController {
    private final BookTypeService service;
    private final BookTypeRequestMapper mapper;

    @GetMapping("/all")
    @Operation(
            summary = "Получение всех типов книг",
            description = "Позволяет получить все данные о типах книг, содерщщихся в библиотеке"
    )
    public ResponseEntity<List<BookTypeRequest>> getAllBookType() {
        List<BookTypeRequest> result = service.getAll().stream().map(mapper::mapBookTypeToRequest).toList();
        return ResponseEntity.ok(result);
    }

    @PostMapping("/add")
    @Operation(
            summary = "Добавление типа книг",
            description = "Позволяет добавить новый тип книги в библиотеку"
    )
    public ResponseEntity<String> addBookType(@RequestBody BookTypeRequest bookTypeRequest) {
        BookType bookType = mapper.mapRequestToDto(bookTypeRequest);
        service.saveBookType(bookType);
        return ResponseEntity.ok("OK");
    }

    @DeleteMapping("/delete/{id}")
    @Operation(
            summary = "Удаление типа книги",
            description = "Позволяет удалить тип книг с конкретным id из библиотеки. Id будет взят из url"
    )
    public ResponseEntity<String> deleteBookType(@PathVariable @Min(1) @Parameter(description = "Идентификатор типа книги для удаления") long id) {
        service.deleteBookType(id);
        return ResponseEntity.ok("OK");
    }

    @PutMapping("/update")
    @Operation(
            summary = "Редактирование книги",
            description = "Позволяет редактировать тип книг. Все данные для изменения будут переданы в теле запроса"
    )
    public ResponseEntity<String> updateBookType(@RequestBody BookTypeRequest bookTypeRequest) {
        BookType bookType = mapper.mapRequestToDto(bookTypeRequest);
        mapper.mapBookTypeToRequest(service.updateBookType(bookType));
        return ResponseEntity.ok("OK");
    }
}
