package com.io.github.abeatrizsc.auth_ms.controllers;

import com.io.github.abeatrizsc.auth_ms.domain.User;
import com.io.github.abeatrizsc.auth_ms.dto.LoginRequestDto;
import com.io.github.abeatrizsc.auth_ms.dto.RegisterRequestDto;
import com.io.github.abeatrizsc.auth_ms.dto.LoginResponseDto;
import com.io.github.abeatrizsc.auth_ms.dto.RegisterResponseDto;
import com.io.github.abeatrizsc.auth_ms.infra.security.TokenService;
import com.io.github.abeatrizsc.auth_ms.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequestDto body){
        User user = userService.findUserByEmail(body.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));
        if(passwordEncoder.matches(body.getPassword(), user.getPassword())) {
            String token = tokenService.generateToken(user);
            return ResponseEntity.ok(new LoginResponseDto(token));
        }
        return ResponseEntity.badRequest().build();
    }


    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegisterRequestDto body){
        Optional<User> user = userService.findUserByEmail(body.getEmail());

        if(user.isEmpty()) {
            User newUser = new User();
            newUser.setPassword(passwordEncoder.encode(body.getPassword()));
            newUser.setEmail(body.getEmail());
            newUser.setName(body.getName());
            userService.create(newUser);

            return ResponseEntity.status(HttpStatus.CREATED).body(new RegisterResponseDto("User created successfully!"));
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new RegisterResponseDto("Email already in use."));
    }
}
