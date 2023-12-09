package org.polytech.rest.journal;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import org.polytech.db.model.Client;

import java.time.LocalDate;

@Builder
public record JournalRequest(
        long id,
        @JsonProperty("book_id")
        long bookId,
        @JsonProperty("client_id")
        long clientId,
        @JsonProperty("date_beg")
        LocalDate dateBeg,
        @JsonProperty("date_end")
        LocalDate dateEnd,
        @JsonProperty("date_ret")
        LocalDate dateRet
) {
}
