package io.github.abeatrizsc.study_gamification_ms.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CardAnswerDto {
    @NotBlank(message = "Card id is required.")
    private String id;

    @NotNull(message = "Please inform the answer status.")
    private Boolean isHit;
}
