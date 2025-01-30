package com.io.github.abeatrizsc.auth_ms.controllers;

import com.io.github.abeatrizsc.auth_ms.domain.User;
import com.io.github.abeatrizsc.auth_ms.exceptions.UserNotFoundException;
import com.io.github.abeatrizsc.auth_ms.infra.security.TokenService;
import com.io.github.abeatrizsc.auth_ms.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {
    private UserService userService;
    private TokenService tokenService;

    @GetMapping("/{id}")
    public User getUserById(HttpServletRequest request, @PathVariable String id) {
        String requestUser = tokenService.validateToken(tokenService.recoverToken(request));

        if (Objects.equals(id, requestUser)) {
            return userService.findUserById(id).orElseThrow(UserNotFoundException::new);
        }

        throw new SecurityException();
    }
}
