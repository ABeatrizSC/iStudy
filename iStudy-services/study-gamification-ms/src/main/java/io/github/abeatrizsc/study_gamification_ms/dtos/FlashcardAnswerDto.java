package io.github.abeatrizsc.study_gamification_ms.dtos;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class FlashcardAnswerDto {
    @NotEmpty
    List<CardAnswerDto> cardsAnswer;
}
