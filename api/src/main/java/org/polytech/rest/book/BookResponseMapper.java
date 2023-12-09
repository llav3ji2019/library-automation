package org.polytech.rest.book;

import org.polytech.db.model.Book;
import org.springframework.stereotype.Component;

@Component
public class BookResponseMapper {

    public BookResponse mapToBookResponse(Book book) {
        return BookResponse.builder()
                .cnt(book.getCnt())
                .id(book.getId())
                .name(book.getName())
                .typeName(book.getBookType().getName())
                .build();
    }
}
