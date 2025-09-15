package com.io.github.abeatrizsc.auth_ms.controllers;

import com.io.github.abeatrizsc.auth_ms.domain.User;
import com.io.github.abeatrizsc.auth_ms.dto.*;
import com.io.github.abeatrizsc.auth_ms.exceptions.InvalidPasswordException;
import com.io.github.abeatrizsc.auth_ms.exceptions.UserNotFoundException;
import com.io.github.abeatrizsc.auth_ms.infra.security.TokenService;
import com.io.github.abeatrizsc.auth_ms.services.AuthService;
import com.io.github.abeatrizsc.auth_ms.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@Valid @RequestBody LoginRequestDto body){
        LoginResponseDto loginResponseDto = authService.login(body);
        return ResponseEntity.ok(loginResponseDto);
    }

    @PostMapping("/register")
    public ResponseEntity register(@Valid @RequestBody RegisterRequestDto body) {
        RegisterResponseDto registerResponseDto = authService.register(body);

        return ResponseEntity.status(HttpStatus.CREATED).body(registerResponseDto);
    }

    @GetMapping("/authenticated-user")
    public String getAuthenticatedUserId(HttpServletRequest request) {
        return authService.getAuthenticatedUserId(request);
    }
}
