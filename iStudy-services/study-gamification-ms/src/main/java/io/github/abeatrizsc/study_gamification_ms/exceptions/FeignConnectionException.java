package io.github.abeatrizsc.study_gamification_ms.exceptions;

public class FeignConnectionException extends RuntimeException {
    public FeignConnectionException() {
        super("An error occurred when trying to connect to the service.");
    }
}
