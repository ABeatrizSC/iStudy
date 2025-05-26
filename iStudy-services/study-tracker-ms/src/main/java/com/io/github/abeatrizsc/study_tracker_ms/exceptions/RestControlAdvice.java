package com.io.github.abeatrizsc.study_tracker_ms.exceptions;

import com.io.github.abeatrizsc.study_tracker_ms.exceptions.dto.ErrorMessageDto;
import feign.FeignException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class RestControlAdvice {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorMessageDto> handleValidationException(MethodArgumentNotValidException e) {
        List<String> errors = e.getBindingResult().getFieldErrors()
                .stream()
                .map(error -> error.getDefaultMessage())
                .collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorMessageDto(HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST, errors.get(0)));
    }

    @ExceptionHandler(ConflictException.class)
    public ResponseEntity<ErrorMessageDto> handleConflictException(ConflictException e) {

        return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorMessageDto(HttpStatus.CONFLICT.value(), HttpStatus.CONFLICT, e.getMessage()));
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorMessageDto> handleNotFoundException(NotFoundException e) {

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorMessageDto(HttpStatus.NOT_FOUND.value(), HttpStatus.NOT_FOUND, e.getMessage()));
    }

    @ExceptionHandler(SecurityException.class)
    public ResponseEntity<ErrorMessageDto> handleSecurityException(SecurityException e) {

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorMessageDto(HttpStatus.UNAUTHORIZED.value(), HttpStatus.UNAUTHORIZED, "You don't have permission to access this resource."));
    }

    @ExceptionHandler(FeignConnectionException.class)
    public ResponseEntity<ErrorMessageDto> handleFeignConnectionException(FeignConnectionException e) {

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorMessageDto(HttpStatus.INTERNAL_SERVER_ERROR.value(), HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage()));
    }

    @ExceptionHandler(InvalidTokenException.class)
    public ResponseEntity<ErrorMessageDto> handleTokenInvalidException(InvalidTokenException e) {

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorMessageDto(HttpStatus.UNAUTHORIZED.value(), HttpStatus.UNAUTHORIZED, e.getMessage()));
    }

    @ExceptionHandler(UserIdUnavailableException.class)
    public ResponseEntity<ErrorMessageDto> handleUserIdUnavailableException(UserIdUnavailableException e) {

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorMessageDto(HttpStatus.INTERNAL_SERVER_ERROR.value(), HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage()));
    }
}