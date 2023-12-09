package org.polytech.db.client;

import lombok.RequiredArgsConstructor;
import org.polytech.db.model.BookType;
import org.polytech.db.model.Client;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClientService {
    private final ClientRepository repository;

    public List<Client> getAll() {
        return repository.findAll();
    }
    public Client updateClient(Client data) {
        Optional<Client> bookTypeToUpdate = repository.findClientByPassportNumAndPassportSeria(data.getPassportNum(), data.getPassportSeria());
        if (bookTypeToUpdate.isEmpty()) {
            return repository.save(data);
        }
        data.setId(bookTypeToUpdate.orElseThrow().getId());
        return repository.save(data);
    }

    public Long findClient(Client data) {
        return repository.findClientByPassportNumAndPassportSeria(data.getPassportNum(), data.getPassportSeria()).orElseThrow().getId();
    }

    public void deleteClient(Client data) {
        repository.delete(data);
    }

    public Client saveClient(Client data) {
        return repository.save(data);
    }
}
