package org.polytech.rest.journal;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.polytech.db.model.Client;

import java.time.LocalDate;

public record JournalRequest(
        @JsonProperty("book_name")
        String bookName,
        @JsonProperty("client_name")
        String clientName,
        @JsonProperty("date_beg")
        LocalDate dateBeg,
        @JsonProperty("date_end")
        LocalDate dateEnd,
        @JsonProperty("date_ret")
        LocalDate dateRet
) {
}
