package com.io.github.abeatrizsc.auth_ms.services;

import com.io.github.abeatrizsc.auth_ms.domain.User;
import com.io.github.abeatrizsc.auth_ms.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {
    private UserRepository repository;

    public Optional<User> findUserById(String id) {
        return repository.findById(id);
    }

    public Optional<User> findUserByEmail(String email) {
        return repository.findByEmail(email);
    }

    public void create(User newUser) {
        repository.save(newUser);
    }
}
