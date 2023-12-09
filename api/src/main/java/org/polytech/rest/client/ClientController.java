package org.polytech.rest.client;

import lombok.RequiredArgsConstructor;
import org.polytech.db.client.ClientService;
import org.polytech.db.model.Client;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/library/client")
@RequiredArgsConstructor
public class ClientController {
    private final ClientService clientService;
    private final ClientRequestMapper clientRequestMapper;


    @GetMapping("/all")
    public List<Client> getAllClients() {
        return clientService.getAll();
    }

    @PostMapping("/add")
    public Client addClient(@RequestBody ClientRequest request) {
        return clientService.saveClient(clientRequestMapper.mapToClientDto(request));
    }

    @DeleteMapping("/delete")
    public void deleteClient(@RequestBody ClientRequest request) {
        clientService.deleteClient(clientRequestMapper.mapToClientDto(request));
    }

    @PutMapping("/update")
    public Client updateClient(@RequestBody ClientRequest request) {
        return clientService.updateClient(clientRequestMapper.mapToClientDto(request));
    }
}
