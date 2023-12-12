package org.polytech.db.journal;

import lombok.RequiredArgsConstructor;
import org.polytech.db.exception.TriggerException;
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

    public Journal updateJournal(Journal data) throws TriggerException {
        return saveJournal(data);
    }

    public void deleteJournal(long id) throws TriggerException {
        try {
            journalRepository.deleteById(id);
        } catch (Exception e) {
            throw new TriggerException("Книга не была возвращена. Транзакция отменена");
        }
    }

    public Journal saveJournal(Journal data) throws TriggerException {
        try {
            return journalRepository.save(data);
        } catch (Exception e) {
            throw new TriggerException("Читатель с таким номером паспорта уже существует");
        }
    }
}
