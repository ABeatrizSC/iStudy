package io.github.abeatrizsc.discipline_ms.exceptions;

import java.sql.SQLIntegrityConstraintViolationException;

public class ConflictException extends SQLIntegrityConstraintViolationException {
    public ConflictException(String resource) {
        super("This " + resource + " already exists.");
    }
}
