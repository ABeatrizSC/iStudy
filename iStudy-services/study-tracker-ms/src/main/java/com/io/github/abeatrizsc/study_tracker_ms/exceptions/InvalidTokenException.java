package com.io.github.abeatrizsc.study_tracker_ms.exceptions;

public class InvalidTokenException extends RuntimeException {
    public InvalidTokenException() {
        super("Null token.");
    }
}
