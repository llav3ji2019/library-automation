package org.polytech.db.booktype;

import lombok.RequiredArgsConstructor;
import org.polytech.db.model.BookType;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookTypeService {
    private final BookTypeRepository bookTypeRepository;

    public List<BookType> getAll() {
        return bookTypeRepository.findAll();
    }

    public BookType updateBookType(BookType data) {
        Optional<BookType> bookTypeToUpdate = bookTypeRepository.findBookTypeByName(data.getName());
        if (bookTypeToUpdate.isEmpty()) {
            return bookTypeRepository.save(data);
        }
        data.setId(bookTypeToUpdate.orElseThrow().getId());
        return bookTypeRepository.save(data);
    }

    public Long findBookType(String name) {
        return bookTypeRepository.findBookTypeByName(name).orElseThrow().getId();
    }

    public void deleteBookType(BookType data) {
        bookTypeRepository.delete(data);
    }

    public BookType saveBookType(BookType data) {
        return bookTypeRepository.save(data);
    }
}
