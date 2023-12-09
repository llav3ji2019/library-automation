package org.polytech.rest.book;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

@Builder
public record BookResponse(
        long id,
        String name,
        int cnt,
        @JsonProperty("type_name")
        String typeName
) {
}
