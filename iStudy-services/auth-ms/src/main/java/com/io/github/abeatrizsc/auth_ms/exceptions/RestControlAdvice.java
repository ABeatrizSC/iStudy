package com.io.github.abeatrizsc.auth_ms.exceptions;

import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.io.github.abeatrizsc.auth_ms.dto.EmailAlreadyInUseException;
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
    public ResponseEntity<RestErrorMessage> handleValidationException(MethodArgumentNotValidException e) {
        List<String> errors = e.getBindingResult().getFieldErrors()
                .stream()
                .map(error -> error.getDefaultMessage())
                .collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new RestErrorMessage(HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST, errors.get(0)));
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<RestErrorMessage> handleUserNotFoundException(UserNotFoundException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new RestErrorMessage(HttpStatus.NOT_FOUND.value(), HttpStatus.NOT_FOUND, e.getMessage()));
    }

    @ExceptionHandler(InvalidPasswordException.class)
    public ResponseEntity<RestErrorMessage> handleInvalidPasswordException(InvalidPasswordException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new RestErrorMessage(HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST, e.getMessage()));
    }

    @ExceptionHandler(JWTCreationException.class)
    public ResponseEntity<RestErrorMessage> handleJWTCreationException(JWTCreationException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RestErrorMessage(HttpStatus.INTERNAL_SERVER_ERROR.value(), HttpStatus.INTERNAL_SERVER_ERROR, "An error occurred while creating the token."));
    }

    @ExceptionHandler(SecurityException.class)
    public ResponseEntity<RestErrorMessage> handleSecurityException(SecurityException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new RestErrorMessage(HttpStatus.UNAUTHORIZED.value(), HttpStatus.UNAUTHORIZED, "You don't have permission to perform this action."));
    }

    @ExceptionHandler(EmailAlreadyInUseException.class)
    public ResponseEntity<RestErrorMessage> handleEmailAlreadyInUseException(EmailAlreadyInUseException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(new RestErrorMessage(HttpStatus.CONFLICT.value(), HttpStatus.CONFLICT, e.getMessage()));
    }
}
