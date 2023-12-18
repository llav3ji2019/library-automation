package org.polytech.rest.journal;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.polytech.db.exception.TriggerException;
import org.polytech.db.journal.JournalService;
import org.polytech.db.model.Journal;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequestMapping("/library/journal")
@RequiredArgsConstructor
@Tag(name="Journal Controller", description="Контроллер для удаления, редактирования, добавления и получения всех записей в журнале." +
        "А также для просмотра статистики.")
public class JournalController {
    private final JournalService journalService;
    private final JournalRequestMapper journalRequestMapper;
    private final JournalResponseMapper journalResponseMapper;

    @GetMapping("/all")
    @Operation(
            summary = "Получение всех записей в журнале",
            description = "Позволяет получить все записи в журнале библиотекаря"
    )
    public ResponseEntity<List<JournalResponse>> getAllJournal() {
        List<JournalResponse> responses = journalService.getAll()
                .stream()
                .map(journalResponseMapper::mapToJournalRequest)
                .toList();

        return ResponseEntity.ok(responses);
    }

    @PostMapping("/add")
    @Operation(
            summary = "Добавление журнальной записи",
            description = "Позволяет добавить новую запись в журнал библиотекаря"
    )
    public ResponseEntity<String> addJournal(@RequestBody JournalRequest request) {
        try {
            Journal savedJournal = journalService.saveJournal(journalRequestMapper.mapToJournalDto(request));
            return ResponseEntity.ok(savedJournal.toString());
        } catch (TriggerException e) {
            return ResponseEntity.status(NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    @Operation(
            summary = "Удаление журнальной записи",
            description = "Позволяет удалить запись в журнал библиотекаря с конкретным id. Id будет взят из url"
    )
    public ResponseEntity<String> deleteJournal(@PathVariable @Parameter(description = "Идентификатор записи в журнале для удаления") long id) {
        try {
            journalService.deleteJournal(id);
            return ResponseEntity.ok().build();
        } catch (TriggerException e) {
            return ResponseEntity.status(NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/update")
    @Operation(
            summary = "Редактирование записи в журнале",
            description = "Позволяет редактировать запись в журнале. Все данные для изменения будут переданы в теле запроса"
    )
    public ResponseEntity<String> updateJournal(@RequestBody JournalRequest request) {
        try {
            Journal updatedJournal = journalService.updateJournal(journalRequestMapper.mapToJournalDto(request));
            return ResponseEntity.ok(updatedJournal.toString());
        } catch (TriggerException e) {
            return ResponseEntity.status(NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/statistic/book/amount/{clientId}")
    @Operation(
            summary = "Количество книг у клиента",
            description = "Позволяет получить информацию о количестве книг у клиента с заданным id. id будет задан в url"
    )
    public long findClientBookAmount(@PathVariable @Min(1) @Parameter(description = "Идентификатор пользователя") long clientId) {
        return journalService.findClientBookAmount(clientId);
    }

    @GetMapping("/statistic/fine/biggest")
    @Operation(
            summary = "Самый большой штраф",
            description = "Позволяет получить информацию о самом большом штрафе на данный момент"
    )
    public ResponseEntity<Long> findTheBiggestFine() {
        return ResponseEntity.ok(journalService.findTheBiggestFine());
    }

    @GetMapping("/statistic/fine/sum/{clientId}")
    @Operation(
            summary = "Штраф у заданного клиента",
            description = "Позволяет получить информацию об общей сумме штрафа у клиента с заданным id. id будет задан в url"
    )
    public long findClientFine(@PathVariable @Parameter(description = "Идентификатор пользователя") long clientId) {
        return journalService.findClientFine(clientId);
    }

    @GetMapping("/statistic/popular_book/name")
    @Operation(
            summary = "Три самые популярные книги",
            description = "Позволяет получить 3 самые популярные книги у читателей библиотеки"
    )
    public ResponseEntity<List<String>> findMostPopularBooksNames() {
        return ResponseEntity.ok(journalService.findMostPopularBooksNames());
    }
}
