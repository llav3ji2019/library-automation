package org.polytech.rest.book;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(description = "Ответ для книги")
public record BookResponse(
        @Schema(description = "Идентификатор", example = "124523")
        long id,

        @Schema(description = "Название книги", example = "Ромэо и Джульетта")
        String name,

        @Schema(description = "Остаток книг в библиотеке")
        int cnt,
        @JsonProperty("type_name")
        @Schema(description = "Индетификатор типа книги", example = "13")
        String typeName
) {
}
