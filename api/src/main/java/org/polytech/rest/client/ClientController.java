package org.polytech.rest.client;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.polytech.db.client.ClientService;
import org.polytech.db.exception.TriggerException;
import org.polytech.db.model.Client;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequestMapping("/library/client")
@RequiredArgsConstructor
@Tag(name="Client Controller", description="Контроллер для удаления, редактирования, добавления и получения всех клиентов в базе читателей")
public class ClientController {
    private final ClientService clientService;
    private final ClientRequestMapper clientRequestMapper;

    @GetMapping("/all")
    @Operation(
            summary = "Получение всех читателей",
            description = "Позволяет получить все данные о читателях данной библиотеки"
    )
    public ResponseEntity<List<ClientRequest>> getAllClients() {
        List<ClientRequest> response = clientService.getAll()
                .stream()
                .map(clientRequestMapper::mapToClientRequest)
                .toList();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/add")
    @Operation(
            summary = "Добавление читателя",
            description = "Позволяет добавить нового читателя в базу библиотеки"
    )
    public ResponseEntity<String> addClient(@RequestBody ClientRequest request) {
        try {
            ;Client savedClient = clientService.saveClient(clientRequestMapper.mapToClientDto(request));
            return ResponseEntity.ok(savedClient.toString());
        } catch (TriggerException e) {
            return ResponseEntity.status(NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    @Operation(
            summary = "Удаление читателся",
            description = "Позволяет удалить читателя с конкретным id из библиотеки." +
                    "Id будет взят из url"
    )
    public ResponseEntity<?> deleteClient(@PathVariable @Min(1) @Parameter(description = "Идентификатор читателя для удаления") long id) {
        clientService.deleteClient(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/update")
    @Operation(
            summary = "Редактирование читателся",
            description = "Позволяет редактировать информацию о читателе библиотеки." +
                    "Все данные для изменения будут переданы в теле запроса"
    )
    public ResponseEntity<String> updateClient(@RequestBody ClientRequest request) {
        try {
            Client updateClient = clientService.updateClient(clientRequestMapper.mapToClientDto(request));
            return ResponseEntity.ok(updateClient.toString());
        } catch (TriggerException e) {
            return ResponseEntity.status(NOT_FOUND).body(e.getMessage());
        }
    }
}
