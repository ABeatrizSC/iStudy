package io.github.abeatrizsc.study_gamification_ms.exceptions;

public class NotFoundException extends RuntimeException {
    public NotFoundException(String resource) {
        super(resource + " not found.");
    }
}
