package io.github.abeatrizsc.discipline_ms.exceptions;

public class NotFoundException extends RuntimeException {
    public NotFoundException(String resource) {
        super(resource + " not found.");
    }
}
