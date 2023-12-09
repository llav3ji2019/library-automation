package org.polytech.rest.journal;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

import java.time.LocalDate;

@Builder
public record JournalResponse(
        @JsonProperty("id")
        long id,
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
