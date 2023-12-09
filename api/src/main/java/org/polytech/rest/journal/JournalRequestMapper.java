package org.polytech.rest.journal;

import lombok.RequiredArgsConstructor;
import org.polytech.db.book.BookService;
import org.polytech.db.client.ClientService;
import org.polytech.db.model.Journal;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JournalRequestMapper {
    private final BookService bookService;
    private final ClientService clientService;

    public Journal mapToJournalDto(JournalRequest request) {
        return Journal.builder()
                .dateRet(request.dateRet())
                .dateEnd(request.dateEnd())
                .dateBeg(request.dateBeg())
                .book(bookService.findBookByName(request.bookName()))
                .build();
    }
}
