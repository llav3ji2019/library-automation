package org.polytech.rest.book;

import lombok.Builder;

@Builder
public record BookRequest(
        String name,
        Integer cnt,
        String type
) {
}
