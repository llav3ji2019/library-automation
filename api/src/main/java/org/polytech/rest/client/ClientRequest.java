package org.polytech.rest.client;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

@Builder
public record ClientRequest (
        @JsonProperty("first_name")
        String firstName,
        @JsonProperty("last_name")
        String lastName,
        @JsonProperty("father_name")
        String fatherName,
        @JsonProperty("passport_seria")
        String passportSeria,
        @JsonProperty("passport_num")
        String passportNum
) {
}
