package io.github.abeatrizsc.study_gamification_ms.dtos;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class QuizRequestDto {
    @NotBlank(message = "Quiz title is required.")
    private String title;

    @NotEmpty(message = "The quiz must have questions.")
    @Size(min = 5, message = "The quiz must have 5 or more questions.")
    private List<@Valid QuestionRequestDto> questions;
}
