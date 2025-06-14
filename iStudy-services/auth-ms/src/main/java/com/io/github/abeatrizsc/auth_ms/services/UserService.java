package com.io.github.abeatrizsc.auth_ms.services;

import com.io.github.abeatrizsc.auth_ms.domain.User;
import com.io.github.abeatrizsc.auth_ms.dto.AccountDetailsDto;
import com.io.github.abeatrizsc.auth_ms.dto.DeleteAccountDto;
import com.io.github.abeatrizsc.auth_ms.dto.DeleteUserEventDto;
import com.io.github.abeatrizsc.auth_ms.dto.UpdateAccountDto;
import com.io.github.abeatrizsc.auth_ms.exceptions.InvalidPasswordException;
import com.io.github.abeatrizsc.auth_ms.exceptions.UserNotFoundException;
import com.io.github.abeatrizsc.auth_ms.infra.security.SecurityConfig;
import com.io.github.abeatrizsc.auth_ms.publisher.UserEventsPublisher;
import com.io.github.abeatrizsc.auth_ms.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {
    private UserRepository repository;
    private SecurityConfig securityConfig;
    private UserEventsPublisher userEventsPublisher;

    public User findUserById(String id) {
        return repository.findById(id).orElseThrow(UserNotFoundException::new);
    }

    public Optional<User> findUserByEmail(String email) {
        return repository.findByEmail(email);
    }

    public void create(User newUser) {
        repository.save(newUser);
    }

    public void updateAccount(String userId, UpdateAccountDto dto) {
        User user = findUserById(userId);

        if (isProvidedPasswordCorrect(dto.getCurrentPassword(), user.getPassword())) {
            if(areDifferentPasswords(dto.getNewPassword(), user.getPassword())) {
                String newPasswordEncoded = securityConfig.passwordEncoder().encode(dto.getNewPassword());
                user.setPassword(newPasswordEncoded);
            }

            user.setName(dto.getName());
            user.setEmail(dto.getEmail());

            repository.save(user);
        }
    }

    public Boolean isProvidedPasswordCorrect(String providedPassword, String userPassword) {
        if(securityConfig.passwordEncoder().matches(providedPassword, userPassword)) {
            return true;
        }

        throw new InvalidPasswordException();
    }

    public Boolean areDifferentPasswords(String newPassword, String userPassword){
        if(newPassword.isEmpty()) {
            return false;
        }

        return !securityConfig.passwordEncoder().matches(newPassword, userPassword);
    }

    public void deleteAccount(String id, DeleteAccountDto dto) {
        User user = findUserById(id);

        if(isProvidedPasswordCorrect(dto.getPassword(), user.getPassword())) {
            userEventsPublisher.publishUserDelete(new DeleteUserEventDto(user.getId()));
            repository.delete(user);
        } else {
            throw new InvalidPasswordException();
        }
    }

    public AccountDetailsDto getAccountDetails(String userId) {
        User user = findUserById(userId);

        return new AccountDetailsDto(user.getName(), user.getEmail());
    }
}
