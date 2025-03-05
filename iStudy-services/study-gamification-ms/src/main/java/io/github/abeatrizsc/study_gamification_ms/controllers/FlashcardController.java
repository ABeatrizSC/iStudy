package io.github.abeatrizsc.study_gamification_ms.controllers;

import io.github.abeatrizsc.study_gamification_ms.domain.Card;
import io.github.abeatrizsc.study_gamification_ms.domain.Flashcard;
import io.github.abeatrizsc.study_gamification_ms.dtos.FlashcardAnswerDto;
import io.github.abeatrizsc.study_gamification_ms.dtos.FlashcardRequestDto;
import io.github.abeatrizsc.study_gamification_ms.exceptions.ConflictException;
import io.github.abeatrizsc.study_gamification_ms.services.FlashcardService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("/games/flashcards")
public class FlashcardController {
    private FlashcardService service;

    @GetMapping("/all")
    public ResponseEntity<List<Flashcard>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Flashcard> findById(@PathVariable String id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<Optional<Flashcard>> findByTitle(@RequestParam String title) {
        return ResponseEntity.ok(service.findByTitle(title));
    }

    @PostMapping
    public ResponseEntity<List<Flashcard>> create(@RequestBody @Valid FlashcardRequestDto dto) throws ConflictException {
        List<Flashcard> flashcards = service.create(dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(flashcards);
    }

    @PutMapping("/{id}")
    public ResponseEntity<List<Flashcard>> updateById(@PathVariable String id, @RequestBody @Valid FlashcardRequestDto dto) throws ConflictException {
        List<Flashcard> flashcards = service.update(id, dto);

        return ResponseEntity.ok(flashcards);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<List<Flashcard>> deleteById(@PathVariable String id) {
        List<Flashcard> flashcards = service.delete(id);

        return ResponseEntity.ok(flashcards);
    }

    @PutMapping("/answer/{id}")
    public ResponseEntity<List<Card>> answerFlashcard(@PathVariable String id, @RequestBody @Valid FlashcardAnswerDto dto) {
        return ResponseEntity.ok(service.answer(id, dto));
    }

}
