package org.polytech.rest.login;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(description = "Данные запроса для авторизации")
public record LoginRequest(

        @Schema(description = "Имя пользователя", example = "qwerty")
        String username,

        @Schema(description = "Пароль", example = "qwerty123")
        String password
) {}
