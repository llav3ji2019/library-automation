package org.polytech.rest.journal;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.time.LocalDate;

@Builder
@Schema(description = "Данные ответа записи журнала")
public record JournalResponse(
        @JsonProperty("id")
        @Schema(description = "Индетификатор записи журнала", example = "12345")
        long id,
        @JsonProperty("book_name")
        @Schema(description = "Название книги", example = "Ромэо и Джульетта")
        String bookName,
        @JsonProperty("client_name")
        @Schema(description = "Полное имя клиента", example = "Попов Олег Фёдорович")
        String clientName,
        @JsonProperty("date_beg")
        @Schema(description = "Дата начало аренды книги", example = "2023-01-05")
        LocalDate dateBeg,
        @JsonProperty("date_end")
        @Schema(description = "Дата окончания аренды книги", example = "2023-01-06")
        LocalDate dateEnd,
        @JsonProperty("date_ret")
        @Schema(description = "Дата возврата книги", example = "2023-01-05")
        LocalDate dateRet
) {}
