package com.io.github.abeatrizsc.study_tracker_ms.exceptions.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
public class ErrorMessageVo {
    private Integer status;
    private HttpStatus error;
    private String message;
}
