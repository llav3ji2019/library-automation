package org.polytech.db.journal;

import org.polytech.db.model.Journal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface JournalRepository extends JpaRepository<Journal, Long> {
    @Query(nativeQuery = true, value = "select count(*) from journal j left join clients c2 on j.client_id = c2.id where j.date_ret is null and c2.id = :client_id")
    long findBookAmount(@Param("client_id") long clientId);

    @Query(value = "select sum(EXTRACT(DAY FROM (age(localtimestamp(3), j.date_end))) * (select bt.fine from books b left join book_types bt on b.type_id = bt.id where b.id = j.book_id)) as sum from journal j where j.date_ret is NULL and EXTRACT (DAY FROM (age(localtimestamp(3), j.date_end))) >= 0 group by j.client_id order by sum desc limit 1", nativeQuery = true)
    long findTheBiggestFine();

    @Query(value = "select sum(EXTRACT(DAY FROM (age(localtimestamp(3), j.date_end))) * (select bt.fine from books b left join book_types bt on b.type_id = bt.id where b.id = j.book_id)) as sum from journal j left join clients c on j.client_id = c.id where j.date_ret is null and EXTRACT (DAY FROM (age(localtimestamp(3), j.date_end))) >= 0 and c.id = :client_id", nativeQuery = true)
    long findClientFine(@Param("client_id") long clientId);

    @Query(value = "select b.name as book_counter from journal j left join books b on j.book_id = b.id group by b.name order by book_counter DESC, b.name limit 3;", nativeQuery = true)
    List<String> findMostPopularBooksNames();
}
