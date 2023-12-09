package org.polytech.rest.journal;

import org.polytech.db.model.Client;
import org.polytech.db.model.Journal;
import org.springframework.stereotype.Component;

@Component
public class JournalResponseMapper {
    public JournalResponse mapToJournalRequest(Journal journal) {
        return JournalResponse.builder()
                .id(journal.getId())
                .bookName(journal.getBook().getName())
                .clientName(getClientFullName(journal.getClient()))
                .dateBeg(journal.getDateBeg())
                .dateEnd(journal.getDateEnd())
                .dateRet(journal.getDateRet())
                .build();
    }

    private static String getClientFullName(Client client) {
        return client.getLastName() + " " + client.getFirstName() + " " + client.getFatherName();
    }
}
