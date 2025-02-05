package io.github.abeatrizsc.discipline_ms.exceptions;

import java.sql.SQLIntegrityConstraintViolationException;

public class DisciplineNameConflictException extends SQLIntegrityConstraintViolationException {
    public DisciplineNameConflictException() {
        super("This discipline name already exists.");
    }
}
