package io.github.abeatrizsc.study_gamification_ms.exceptions.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
public class ErrorMessageDto {
    private Integer status;
    private HttpStatus error;
    private String message;
}
