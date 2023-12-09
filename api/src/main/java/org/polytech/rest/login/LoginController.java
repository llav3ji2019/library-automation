package org.polytech.rest.login;

import lombok.RequiredArgsConstructor;
import org.polytech.db.login.LoginService;
import org.polytech.db.login.LoginStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/library")
public class LoginController {
    private final LoginService loginService;
    private final LoginRequestMapper loginRequestMapper;

    @PostMapping("/login")
    public LoginStatus checkUser(@RequestBody LoginRequest request) {
        return loginService.checkUser(loginRequestMapper.convertToUser(request));
    }
}
