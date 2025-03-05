package io.github.abeatrizsc.study_gamification_ms.controllers;

import io.github.abeatrizsc.study_gamification_ms.domain.Question;
import io.github.abeatrizsc.study_gamification_ms.services.QuestionService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("/games/quizzes/questions")
public class QuestionController {
    private QuestionService service;

    @GetMapping("/all")
    public ResponseEntity<List<Question>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Question> findById(@PathVariable String id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<Optional<Question>> findByQuestion(@RequestParam String question) {
        return ResponseEntity.ok(service.findByQuestion(question));
    }
}
