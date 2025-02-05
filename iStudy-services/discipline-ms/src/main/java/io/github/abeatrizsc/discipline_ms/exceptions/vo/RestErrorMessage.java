package io.github.abeatrizsc.discipline_ms.exceptions.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
public class RestErrorMessage {
    private Integer status;
    private HttpStatus error;
    private String message;
}