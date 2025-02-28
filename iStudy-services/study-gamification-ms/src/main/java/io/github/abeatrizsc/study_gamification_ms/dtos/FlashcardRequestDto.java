package io.github.abeatrizsc.study_gamification_ms.dtos;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class FlashcardRequestDto {
    @NotBlank(message = "Flashcard title is required.")
    private String title;

    @NotEmpty(message = "The flashcard must have cards with questions and answers.")
    @Size(min = 5, message = "The flashcard must have at least 5 cards.")
    private List<@Valid CardRequestDto> cards;
}
