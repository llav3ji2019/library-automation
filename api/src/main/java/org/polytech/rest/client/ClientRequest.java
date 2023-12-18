package org.polytech.rest.client;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record ClientRequest (
        @Schema(description = "Индетификатор для читателя", example = "123")
        long id,

        @Schema(description = "Имя читателя", example = "Олег")
        @JsonProperty("first_name")
        String firstName,
        @JsonProperty("last_name")
        @Schema(description = "Фамилия читателя", example = "Попов")
        String lastName,
        @JsonProperty("father_name")
        @Schema(description = "Отчество читателя", example = "Александрович")
        String fatherName,
        @JsonProperty("passport_seria")
        @Schema(description = "Серия паспорта читателя", example = "1234")
        String passportSeria,
        @JsonProperty("passport_num")
        @Schema(description = "Номер паспорта читателя", example = "123456")
        String passportNum
) {}
