package org.polytech.db.book;

import lombok.RequiredArgsConstructor;
import org.polytech.db.model.Book;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookService {
    private final BookRepository bookRepository;

    public List<Book> getAll() {
        return bookRepository.findAll();
    }

    public Book updateBook(Book data) {
        Optional<Book> bookTypeToUpdate = bookRepository.findBookById(data.getId());
        if (bookTypeToUpdate.isEmpty()) {
            return bookRepository.save(data);
        }
        data.setId(bookTypeToUpdate.orElseThrow().getId());
        return bookRepository.save(data);
    }

    public void deleteBook(long id) {
        bookRepository.deleteById(id);
    }

    public Book saveBook(Book data) {
        return bookRepository.save(data);
    }
}
