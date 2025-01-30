package com.io.github.abeatrizsc.auth_ms.controllers;

import com.io.github.abeatrizsc.auth_ms.domain.User;
import com.io.github.abeatrizsc.auth_ms.dto.*;
import com.io.github.abeatrizsc.auth_ms.exceptions.InvalidPasswordException;
import com.io.github.abeatrizsc.auth_ms.exceptions.UserNotFoundException;
import com.io.github.abeatrizsc.auth_ms.infra.security.TokenService;
import com.io.github.abeatrizsc.auth_ms.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@Valid @RequestBody LoginRequestDto body){
        User user = userService.findUserByEmail(body.getEmail()).orElseThrow(() -> new UserNotFoundException());

        if(!passwordEncoder.matches(body.getPassword(), user.getPassword())) {
            throw new InvalidPasswordException();
        }

        String token = tokenService.generateToken(user);
        return ResponseEntity.ok(new LoginResponseDto(token));
    }


    @PostMapping("/register")
    public ResponseEntity register(@Valid @RequestBody RegisterRequestDto body) {
        Optional<User> user = userService.findUserByEmail(body.getEmail());

        if(user.isEmpty()) {
            User newUser = new User();
            newUser.setPassword(passwordEncoder.encode(body.getPassword()));
            newUser.setEmail(body.getEmail());
            newUser.setName(body.getName());
            userService.create(newUser);

            return ResponseEntity.status(HttpStatus.CREATED).body(new RegisterResponseDto("User created successfully!"));
        }

        throw new EmailAlreadyInUseException();
    }
}
