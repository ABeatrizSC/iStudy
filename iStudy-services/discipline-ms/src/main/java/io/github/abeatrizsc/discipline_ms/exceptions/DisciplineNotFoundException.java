package io.github.abeatrizsc.discipline_ms.exceptions;

public class DisciplineNotFoundException extends RuntimeException {
    public DisciplineNotFoundException() {
        super("Subject not found.");
    }
}
