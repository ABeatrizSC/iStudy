package com.io.github.abeatrizsc.auth_ms.controllers;

import com.io.github.abeatrizsc.auth_ms.domain.User;
import com.io.github.abeatrizsc.auth_ms.dto.AccountDetailsDto;
import com.io.github.abeatrizsc.auth_ms.dto.DeleteAccountDto;
import com.io.github.abeatrizsc.auth_ms.dto.UpdateAccountDto;
import com.io.github.abeatrizsc.auth_ms.infra.security.TokenService;
import com.io.github.abeatrizsc.auth_ms.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
            return userService.findUserById(id);
        }

        throw new SecurityException();
    }

    @GetMapping("/details")
    public AccountDetailsDto getUserAccountDetails(HttpServletRequest request) {
        String userId = tokenService.validateToken(tokenService.recoverToken(request));

        return userService.getAccountDetails(userId);
    }

    @PutMapping
    public ResponseEntity updateUserAccount(HttpServletRequest request, @Valid @RequestBody UpdateAccountDto updateAccountDto) {
        String userId = tokenService.validateToken(tokenService.recoverToken(request));

        userService.updateAccount(userId, updateAccountDto);

        return ResponseEntity.ok("Account updated successfully!");
    }

    @DeleteMapping
    public ResponseEntity deleteUserAccount(HttpServletRequest request, @Valid @RequestBody DeleteAccountDto dto) {
        String userId = tokenService.validateToken(tokenService.recoverToken(request));

        userService.deleteAccount(userId, dto);

        return ResponseEntity.ok("Account deleted successfully!");
    }
}
