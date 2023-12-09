package org.polytech.rest.login;

import lombok.Builder;

@Builder
public record LoginRequest(
        String username,
        String password
) {}
