package org.polytech.db.journal;

import lombok.RequiredArgsConstructor;
import org.polytech.db.exception.TriggerException;
import org.polytech.db.model.Journal;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.polytech.db.utils.exceptionutils.ExceptionUtils.getClientError;

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
            throw new TriggerException(getClientError(e.getMessage()));
        }
    }

    public Journal saveJournal(Journal data) throws TriggerException {
        try {
            return journalRepository.save(data);
        } catch (Exception e) {
            throw new TriggerException(getClientError(e.getMessage()));
        }
    }

    public long findClientBookAmount(long clientId) {
        return journalRepository.findBookAmount(clientId).orElse(0L);
    }

    public long findTheBiggestFine() {
        return journalRepository.findTheBiggestFine().orElse(0L);
    }

    public long findClientFine(long clientId) {
        return journalRepository.findClientFine(clientId).orElse(0L);
    }

    public List<String> findMostPopularBooksNames() {
        return journalRepository.findMostPopularBooksNames();
    }
}
