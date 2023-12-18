package org.polytech.rest.booktype;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(description = "Данные запроса типа книги")
public record BookTypeRequest (
        @Schema(description = "Индетификатор типа книги", example = "13")
        long id,

        @Schema(description = "Название для типа книги", example = "Легендарная")
        String name,

        @Schema(description = "Количество книг данного типа", example = "254")
        Integer cnt,

        @Schema(description = "Штраф в дань за опоздание", example = "1000")
        Double fine,
        @JsonProperty("day_count")
        @Schema(description = "Количество дней для аренды", example = "7")
        Integer dayCount
) {
}
