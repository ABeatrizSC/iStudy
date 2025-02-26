package io.github.abeatrizsc.study_gamification_ms.dto;

import lombok.Data;

@Data
public class OptionRequestDto {
    private String option;
    private Boolean isCorrect;
}