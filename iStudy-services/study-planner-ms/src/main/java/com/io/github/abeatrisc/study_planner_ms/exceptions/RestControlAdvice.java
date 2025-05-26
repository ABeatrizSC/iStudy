package com.io.github.abeatrisc.study_planner_ms.exceptions;

import com.io.github.abeatrisc.study_planner_ms.exceptions.dto.RestErrorMessageDto;
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
    public ResponseEntity<RestErrorMessageDto> handleValidationException(MethodArgumentNotValidException e) {
        List<String> errors = e.getBindingResult().getFieldErrors()
                .stream()
                .map(error -> error.getDefaultMessage())
                .collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new RestErrorMessageDto(HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST, errors.get(0)));
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<RestErrorMessageDto> handleNotFoundException(NotFoundException e) {

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new RestErrorMessageDto(HttpStatus.NOT_FOUND.value(), HttpStatus.NOT_FOUND, e.getMessage()));
    }

    @ExceptionHandler(UserIdUnavailableException.class)
    public ResponseEntity<RestErrorMessageDto> handleUserIdUnavailableException(UserIdUnavailableException e) {

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RestErrorMessageDto(HttpStatus.INTERNAL_SERVER_ERROR.value(), HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage()));
    }
}
