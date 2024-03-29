package org.polytech.db.client;

import lombok.RequiredArgsConstructor;
import org.polytech.db.exception.TriggerException;
import org.polytech.db.model.BookType;
import org.polytech.db.model.Client;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static org.polytech.db.utils.exceptionutils.ExceptionUtils.getClientError;

@Service
@RequiredArgsConstructor
public class ClientService {
    private final ClientRepository repository;

    public List<Client> getAll() {
        return repository.findAll();
    }
    public Client updateClient(Client data) throws TriggerException {
        return saveClient(data);
    }

    public void deleteClient(long id) {
        repository.deleteById(id);
    }

    public Client saveClient(Client data) throws TriggerException {
        try {
            return repository.save(data);
        } catch (Exception e) {
            throw new TriggerException(getClientError(e.getMessage()));
        }
    }
}
