package io.github.abeatrizsc.study_gamification_ms.dto;

import lombok.Data;

import java.util.List;

@Data
public class QuizRequestDto {
    private String title;
    private List<QuestionRequestDto> questions;
}
