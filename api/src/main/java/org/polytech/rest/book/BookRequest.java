package org.polytech.rest.book;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

@Builder
public record BookRequest(
        long id,
        String name,
        Integer cnt,
        @JsonProperty("type_id")
        Long typeId
) {
}
