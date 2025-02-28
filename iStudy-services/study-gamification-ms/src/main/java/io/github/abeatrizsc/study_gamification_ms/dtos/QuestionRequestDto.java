package io.github.abeatrizsc.study_gamification_ms.dtos;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class QuestionRequestDto {
    @NotBlank(message = "The question is required.")
    private String question;

    @NotEmpty(message = "The question must have options.")
    @Size(min = 2, max = 4, message = "The question must have 2 to 4 options.")
    private List<@Valid OptionRequestDto> options;
}