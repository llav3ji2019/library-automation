package org.polytech.db.booktype;

import org.polytech.db.model.BookType;
import org.polytech.db.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookTypeRepository extends JpaRepository<BookType, Long> {
    Optional<BookType> findBookTypeByName(String name);
}
