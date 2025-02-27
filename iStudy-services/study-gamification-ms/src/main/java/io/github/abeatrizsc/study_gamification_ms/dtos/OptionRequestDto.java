package io.github.abeatrizsc.study_gamification_ms.dtos;

import lombok.Data;

@Data
public class OptionRequestDto {
    private String option;
    private Boolean isCorrect;
}