package org.polytech.rest.journal;

import lombok.RequiredArgsConstructor;
import org.polytech.db.exception.TriggerException;
import org.polytech.db.journal.JournalService;
import org.polytech.db.model.Journal;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/library/journal")
@RequiredArgsConstructor
public class JournalController {
    private final JournalService journalService;
    private final JournalRequestMapper journalRequestMapper;
    private final JournalResponseMapper journalResponseMapper;

    @GetMapping("/all")
    public ResponseEntity<List<JournalResponse>> getAllJournal() {
        List<JournalResponse> responses = journalService.getAll()
                .stream()
                .map(journalResponseMapper::mapToJournalRequest)
                .toList();

        return ResponseEntity.ok(responses);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addJournal(@RequestBody JournalRequest request) {
        try {
            Journal savedJournal = journalService.saveJournal(journalRequestMapper.mapToJournalDto(request));
            return ResponseEntity.ok(savedJournal.toString());
        } catch (TriggerException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteJournal(@PathVariable long id) {
        try {
            journalService.deleteJournal(id);
            return ResponseEntity.ok().build();
        } catch (TriggerException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateJournal(@RequestBody JournalRequest request) {
        try {
            Journal updatedJournal = journalService.updateJournal(journalRequestMapper.mapToJournalDto(request));
            return ResponseEntity.ok(updatedJournal.toString());
        } catch (TriggerException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
