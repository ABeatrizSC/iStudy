package io.github.abeatrizsc.discipline_ms.exceptions;

import jakarta.ws.rs.NotFoundException;

public class DisciplineNotFoundException extends NotFoundException {
    public DisciplineNotFoundException() {
        super("Discipline not found.");
    }
}
