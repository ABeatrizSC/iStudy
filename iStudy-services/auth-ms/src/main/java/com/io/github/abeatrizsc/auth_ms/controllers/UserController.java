package com.io.github.abeatrizsc.auth_ms.controllers;

import com.io.github.abeatrizsc.auth_ms.domain.User;
import com.io.github.abeatrizsc.auth_ms.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {
    private UserService service;

    @GetMapping("/{id}")
    public User getUserById(@PathVariable String id) {
        return service.findUserById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }
}
