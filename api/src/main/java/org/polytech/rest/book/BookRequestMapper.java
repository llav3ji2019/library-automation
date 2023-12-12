package org.polytech.rest.book;

import lombok.RequiredArgsConstructor;
import org.polytech.db.booktype.BookTypeService;
import org.polytech.db.model.Book;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BookRequestMapper {
    private final BookTypeService bookTypeService;

    public Book mapToBookDto(BookRequest request) {
        return Book.builder()
                .name(request.name())
                .typeId(request.typeId())
                .id(request.id())
                .cnt(request.cnt())
                .build();
    }
}
