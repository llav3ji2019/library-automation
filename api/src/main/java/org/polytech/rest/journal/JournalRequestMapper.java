package org.polytech.rest.journal;

import lombok.RequiredArgsConstructor;
import org.polytech.db.model.Journal;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JournalRequestMapper {

    public Journal mapToJournalDto(JournalRequest request) {
        return Journal.builder()
                .dateRet(request.dateRet())
                .dateEnd(request.dateEnd())
                .dateBeg(request.dateBeg())
                .bookId(request.id())
                .clientId(request.clientId())
                .id(request.id())
                .build();
    }
}
