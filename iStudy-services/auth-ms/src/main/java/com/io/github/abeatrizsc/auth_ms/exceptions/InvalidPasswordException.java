package com.io.github.abeatrizsc.auth_ms.exceptions;

public class InvalidPasswordException extends RuntimeException {
    public InvalidPasswordException() {
        super("Invalid password.");
    }
}
