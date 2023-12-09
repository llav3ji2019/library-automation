package org.polytech.db.journal;

import org.polytech.db.model.Journal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JournalRepository extends JpaRepository<Journal, Long> {
    Optional<Journal> findJournalById(long id);
}
