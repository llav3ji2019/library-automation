package org.polytech.rest.journal;

import lombok.RequiredArgsConstructor;
import org.polytech.db.journal.JournalService;
import org.polytech.db.model.Journal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/library/journal")
@RequiredArgsConstructor
public class JournalController {
    private final JournalService journalService;
    private final JournalRequestMapper journalRequestMapper;

    @GetMapping("/all")
    public List<Journal> getAllJournal() {
        return journalService.getAll();
    }

    @PostMapping("/add")
    public Journal addJournal(@RequestBody JournalRequest request) {
        return journalService.saveJournal(journalRequestMapper.mapToJournalDto(request));
    }

    @DeleteMapping("/delete")
    public void deleteJournal(@RequestBody JournalRequest request) {
        journalService.deleteJournal(journalRequestMapper.mapToJournalDto(request));
    }

    @PutMapping("/update")
    public Journal updateJournal(@RequestBody JournalRequest request) {
        return journalService.updateJournal(journalRequestMapper.mapToJournalDto(request));
    }
}
