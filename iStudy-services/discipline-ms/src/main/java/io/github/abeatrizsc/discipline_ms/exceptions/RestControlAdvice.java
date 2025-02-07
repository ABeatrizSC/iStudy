package io.github.abeatrizsc.discipline_ms.exceptions;

import io.github.abeatrizsc.discipline_ms.exceptions.vo.RestErrorMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.List;

@org.springframework.web.bind.annotation.RestControllerAdvice
public class RestControlAdvice {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<RestErrorMessage> handleValidationException(MethodArgumentNotValidException e) {
        List<String> errors = e.getBindingResult().getFieldErrors()
                .stream()
                .map(error -> error.getDefaultMessage())
                .toList();

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new RestErrorMessage(HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST, errors.get(0)));
    }

    @ExceptionHandler(DisciplineNameConflictException.class)
    public ResponseEntity<RestErrorMessage> handleDisciplineNameConflictException(DisciplineNameConflictException e) {

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new RestErrorMessage(HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST, e.getMessage()));
    }

    @ExceptionHandler(DisciplineNotFoundException.class)
    public ResponseEntity<RestErrorMessage> handleDisciplineNotFoundException(DisciplineNotFoundException e) {

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new RestErrorMessage(HttpStatus.NOT_FOUND.value(), HttpStatus.NOT_FOUND, e.getMessage()));
    }

    @ExceptionHandler(SecurityException.class)
    public ResponseEntity<RestErrorMessage> handleSecurityException(SecurityException e) {

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new RestErrorMessage(HttpStatus.UNAUTHORIZED.value(), HttpStatus.UNAUTHORIZED, "You don't have permission to access this resource."));
    }

    @ExceptionHandler(FeignConnectionException.class)
    public ResponseEntity<RestErrorMessage> handleFeignConnectionException(FeignConnectionException e) {

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RestErrorMessage(HttpStatus.INTERNAL_SERVER_ERROR.value(), HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage()));
    }
}
