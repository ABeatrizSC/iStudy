package com.io.github.abeatrisc.study_planner_ms.exceptions.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@AllArgsConstructor
public class RestErrorMessageDto {
    private Integer status;
    private HttpStatus error;
    private String message;
}