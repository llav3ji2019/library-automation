package org.polytech.rest.booktype;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

@Builder
public record BookTypeRequest (
        long id,
        String name,
        Integer cnt,
        Double fine,
        @JsonProperty("day_count")
        Integer dayCount
) {
}
