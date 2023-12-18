package org.polytech.rest.login;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.polytech.db.login.LoginService;
import org.polytech.db.login.LoginStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/library")
@Tag(name="Login Controller", description="Контроллер для определения прав пользователя")
public class LoginController {
    private final LoginService loginService;
    private final LoginRequestMapper loginRequestMapper;

    @PostMapping("/login")
    @Operation(
            summary = "Авторизация пользователя",
            description = "Позволяет получить информацию о правах, которые имеет пользователь в данном приложении"
    )
    public ResponseEntity<String> checkUser(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(loginService.checkUser(loginRequestMapper.convertToUser(request)).name());
    }
}
