package org.polytech.rest.booktype;

import com.fasterxml.jackson.annotation.JsonProperty;
public record BookTypeRequest (
        long id,
        String name,
        Integer cnt,
        Double fine,
        @JsonProperty("day_count")
        Integer dayCount
) {
}
