package org.polytech.rest.booktype;

import org.polytech.db.model.BookType;
import org.springframework.stereotype.Component;

@Component
public class BookTypeRequestMapper {
    public BookType mapRequestToDto(BookTypeRequest request) {
        return BookType.builder()
                .cnt(request.cnt())
                .fine(request.fine())
                .name(request.name())
                .dayCount(request.dayCount())
                .id(request.id())
                .build();
    }

    public BookTypeRequest mapBookTypeToRequest(BookType request) {
        return BookTypeRequest.builder()
                .cnt(request.getCnt())
                .fine(request.getFine())
                .name(request.getName())
                .dayCount(request.getDayCount())
                .id(request.getId())
                .build();
    }
}
