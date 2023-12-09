package org.polytech.rest.login;

import lombok.RequiredArgsConstructor;
import org.polytech.db.login.User;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class LoginRequestMapper {
    public User convertToUser(LoginRequest request) {
        return User.builder()
                .password(request.password())
                .username(request.username())
                .build();
    }
}
