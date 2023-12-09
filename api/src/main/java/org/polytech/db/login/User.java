package org.polytech.db.login;

import lombok.Builder;

@Builder
public record User(String username, String password) {
}
