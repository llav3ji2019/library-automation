package org.polytech.rest.journal;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import org.polytech.db.model.Client;

import java.time.LocalDate;

@Builder
@Schema(description = "Данные запроса записи журнала")
public record JournalRequest(
        @Schema(description = "Индетификатор записи журнала", example = "12345")
        long id,
        @JsonProperty("book_id")
        @Schema(description = "Индетификатор книги", example = "12345")
        long bookId,
        @JsonProperty("client_id")
        @Schema(description = "Индетификатор клиента", example = "12345")
        long clientId,
        @JsonProperty("date_beg")
        @Schema(description = "Дата начало аренды книги", example = "2023-01-05")
        LocalDate dateBeg,
        @JsonProperty("date_end")
        @Schema(description = "Дата окончания аренды книги", example = "2023-01-06")
        LocalDate dateEnd,
        @JsonProperty("date_ret")
        @Schema(description = "Дата возврата книги", example = "2023-01-05")
        LocalDate dateRet
) {
}
