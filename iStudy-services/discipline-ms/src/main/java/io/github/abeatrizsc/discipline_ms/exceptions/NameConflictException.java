package io.github.abeatrizsc.discipline_ms.exceptions;

import java.sql.SQLIntegrityConstraintViolationException;

public class NameConflictException extends SQLIntegrityConstraintViolationException {
    public NameConflictException(String resource) {
        super("This " + resource + " already exists.");
    }
}
