package com.io.github.abeatrizsc.study_tracker_ms.exceptions;

public class NotFoundException extends RuntimeException {
    public NotFoundException(String resource) {
        super(resource + " not found.");
    }
}
