package io.github.abeatrizsc.study_gamification_ms.exceptions;

public class UserIdUnavailableException extends RuntimeException {
    public UserIdUnavailableException() {
        super("User ID is missing from header request.");
    }
}
