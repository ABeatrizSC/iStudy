package io.github.abeatrizsc.study_gamification_ms.dtos;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class QuizAnswerDto {
    @NotEmpty(message = "Quiz questions must be answered.")
    private List<@Valid QuestionAnswerDto> questions;
}
