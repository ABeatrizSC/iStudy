package com.io.github.abeatrizsc.auth_ms.services;

import com.io.github.abeatrizsc.auth_ms.domain.User;
import com.io.github.abeatrizsc.auth_ms.dto.*;
import com.io.github.abeatrizsc.auth_ms.exceptions.InvalidPasswordException;
import com.io.github.abeatrizsc.auth_ms.exceptions.UserNotFoundException;
import com.io.github.abeatrizsc.auth_ms.infra.security.TokenService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

@Service
@AllArgsConstructor
public class AuthService {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    public LoginResponseDto login(LoginRequestDto body){
        User user = userService.findUserByEmail(body.getEmail()).orElseThrow(UserNotFoundException::new);

        if(!passwordEncoder.matches(body.getPassword(), user.getPassword())) {
            throw new InvalidPasswordException();
        }

        return new LoginResponseDto(tokenService.generateToken(user));
    }

    public RegisterResponseDto register(RegisterRequestDto body) {
        Optional<User> user = userService.findUserByEmail(body.getEmail());

        if(user.isEmpty()) {
            User newUser = new User();
            newUser.setPassword(passwordEncoder.encode(body.getPassword()));
            newUser.setEmail(body.getEmail());
            newUser.setName(body.getName());
            userService.create(newUser);

            return new RegisterResponseDto("User created successfully!");
        }

        throw new EmailAlreadyInUseException();
    }

    public String getAuthenticatedUserId(HttpServletRequest request) {
        var token = tokenService.recoverToken(request);

        return tokenService.validateToken(token);
    }
}
