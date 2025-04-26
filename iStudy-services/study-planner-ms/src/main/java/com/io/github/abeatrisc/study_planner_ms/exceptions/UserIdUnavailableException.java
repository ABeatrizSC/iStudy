package com.io.github.abeatrisc.study_planner_ms.exceptions;

public class UserIdUnavailableException extends RuntimeException {
    public UserIdUnavailableException() {
        super("User ID is missing from header request.");
    }
}
