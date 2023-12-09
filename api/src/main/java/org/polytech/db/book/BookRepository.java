package org.polytech.db.book;

import org.polytech.db.model.Book;
import org.polytech.db.model.BookType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Long> {
    Optional<Book> findBookByName(String name);
}
