package com.io.github.abeatrizsc.study_tracker_ms.exceptions;

public class FeignConnectionException extends RuntimeException {
    public FeignConnectionException() {
        super("An error occurred when trying to connect to the service.");
    }
}
