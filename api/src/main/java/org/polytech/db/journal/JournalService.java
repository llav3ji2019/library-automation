package org.polytech.db.journal;

import lombok.RequiredArgsConstructor;
import org.polytech.db.model.Book;
import org.polytech.db.model.Journal;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class JournalService {
    private final JournalRepository journalRepository;

    public List<Journal> getAll() {
        return journalRepository.findAll();
    }

    public Journal updateJournal(Journal data) {
        Optional<Journal> bookTypeToUpdate = journalRepository.findJournalById(data.getId());
        if (bookTypeToUpdate.isEmpty()) {
            return journalRepository.save(data);
        }
        data.setId(bookTypeToUpdate.orElseThrow().getId());
        return journalRepository.save(data);
    }

    public void deleteJournal(Journal data) {
        journalRepository.delete(data);
    }

    public Journal saveJournal(Journal data) {
        return journalRepository.save(data);
    }
}
