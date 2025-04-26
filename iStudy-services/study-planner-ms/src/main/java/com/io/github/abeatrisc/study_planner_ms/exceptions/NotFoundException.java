package com.io.github.abeatrisc.study_planner_ms.exceptions;

public class NotFoundException extends RuntimeException {
    public NotFoundException(String resource) {
        super(resource + " not found.");
    }
}