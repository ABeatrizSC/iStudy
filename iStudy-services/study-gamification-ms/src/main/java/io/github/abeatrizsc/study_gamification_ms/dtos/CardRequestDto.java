package io.github.abeatrizsc.study_gamification_ms.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CardRequestDto {
    @NotBlank(message = "Card question is required")
    private String question;

    @NotBlank(message = "Card answer is required")
    private String answer;
}
