package org.polytech.rest.book;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(description = "Книга в запросе")
public record BookRequest(
        @Schema(description = "Идентификатор книги", example = "1223")
        long id,

        @Schema(description = "Название книги", example = "Ромэо и Джульетта")
        String name,

        @Schema(description = "Остаток книг в библиотеке")
        int cnt,

        @Schema(description = "Индетификатор типа книги", example = "13")
        @JsonProperty("type_id")
        Long typeId
) {
}
