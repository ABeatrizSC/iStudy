package com.io.github.abeatrizsc.auth_ms.dto;

public class EmailAlreadyInUseException extends RuntimeException {
    public EmailAlreadyInUseException() {
        super("Email already in use.");
    }
}
