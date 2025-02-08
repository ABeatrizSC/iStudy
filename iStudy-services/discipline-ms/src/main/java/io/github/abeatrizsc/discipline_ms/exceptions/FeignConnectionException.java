package io.github.abeatrizsc.discipline_ms.exceptions;

import feign.FeignException;

public class FeignConnectionException extends RuntimeException {
    public FeignConnectionException() {
        super("An error occurred when trying to connect to the service.");
    }
}
