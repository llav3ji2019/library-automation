package org.polytech.rest.client;

import lombok.RequiredArgsConstructor;
import org.polytech.db.client.ClientService;
import org.polytech.db.exception.TriggerException;
import org.polytech.db.model.Client;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/library/client")
@RequiredArgsConstructor
public class ClientController {
    private final ClientService clientService;
    private final ClientRequestMapper clientRequestMapper;

    @GetMapping("/all")
    public ResponseEntity<List<ClientRequest>> getAllClients() {
        List<ClientRequest> response = clientService.getAll()
                .stream()
                .map(clientRequestMapper::mapToClientRequest)
                .toList();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addClient(@RequestBody ClientRequest request) {
        try {
            ;Client savedClient = clientService.saveClient(clientRequestMapper.mapToClientDto(request));
            return ResponseEntity.ok(savedClient.toString());
        } catch (TriggerException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteClient(@PathVariable long id) {
        clientService.deleteClient(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateClient(@RequestBody ClientRequest request) {
        try {
            Client updateClient = clientService.updateClient(clientRequestMapper.mapToClientDto(request));
            return ResponseEntity.ok(updateClient.toString());
        } catch (TriggerException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
