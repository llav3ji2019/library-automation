package org.polytech.db.journal;

import org.polytech.db.model.Journal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface JournalRepository extends JpaRepository<Journal, Long> {
    @Query(value = "select * from clientBookCounter(:client_id)", nativeQuery = true)
    Optional<Long> findBookAmount(@Param("client_id") long clientId);

    @Query(value = "select * from biggestFineCounter()", nativeQuery = true)
    Optional<Long> findTheBiggestFine();

    @Query(value = "select * from clientFineCounter(:client_id)", nativeQuery = true)
    Optional<Long> findClientFine(@Param("client_id") long clientId);

    @Query(value = "select book_name from mostPopularBook();", nativeQuery = true)
    List<String> findMostPopularBooksNames();
}
