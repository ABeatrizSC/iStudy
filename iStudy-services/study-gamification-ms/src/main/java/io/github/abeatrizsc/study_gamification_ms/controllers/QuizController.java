package io.github.abeatrizsc.study_gamification_ms.controllers;

import io.github.abeatrizsc.study_gamification_ms.domain.Question;
import io.github.abeatrizsc.study_gamification_ms.domain.Quiz;
import io.github.abeatrizsc.study_gamification_ms.dtos.QuizAnswerDto;
import io.github.abeatrizsc.study_gamification_ms.dtos.QuizRequestDto;
import io.github.abeatrizsc.study_gamification_ms.services.QuizService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("/games/quizzes")
public class QuizController {
    private QuizService service;

    @GetMapping("/all")
    public ResponseEntity<List<Quiz>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Quiz> findById(@PathVariable String id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<Optional<Quiz>> findByTitle(@RequestParam String title) {
        return ResponseEntity.ok(service.findByTitle(title));
    }

    @PostMapping
    public ResponseEntity<List<Quiz>> create(@RequestBody @Valid QuizRequestDto dto) {
        List<Quiz> quizzes = service.create(dto);

        return  ResponseEntity.status(HttpStatus.CREATED).body(quizzes);
    }

    @PutMapping("/{id}")
    public ResponseEntity<List<Quiz>> updateById(@PathVariable String id, @RequestBody @Valid QuizRequestDto dto) {
        List<Quiz> quizzes = service.update(id, dto);

        return ResponseEntity.ok(quizzes);
    }

    @PutMapping("/answer/{id}")
    public ResponseEntity<List<Question>> updateById(@PathVariable String id, @RequestBody @Valid QuizAnswerDto dto) {
        return ResponseEntity.ok(service.answer(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<List<Quiz>> deleteById(@PathVariable String id) {
        List<Quiz> quizzes = service.delete(id);

        return ResponseEntity.ok(quizzes);
    }
}
