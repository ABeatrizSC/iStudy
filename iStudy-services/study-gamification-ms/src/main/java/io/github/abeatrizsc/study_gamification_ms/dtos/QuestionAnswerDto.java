package io.github.abeatrizsc.study_gamification_ms.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class QuestionAnswerDto {
    @NotBlank(message = "Question id is required.")
    private String id;

    @NotBlank(message = "There are unanswered questions.")
    private String optionChosen;
}