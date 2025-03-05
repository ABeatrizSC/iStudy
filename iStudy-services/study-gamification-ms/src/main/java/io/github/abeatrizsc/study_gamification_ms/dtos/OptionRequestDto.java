package io.github.abeatrizsc.study_gamification_ms.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class OptionRequestDto {
    @NotBlank(message = "The option name is required.")
    private String option;

    @NotNull(message = "Please advise if the option is correct or not.")
    private Boolean isCorrect;
}