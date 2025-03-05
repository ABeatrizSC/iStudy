package io.github.abeatrizsc.study_gamification_ms.controllers;

import io.github.abeatrizsc.study_gamification_ms.domain.Option;
import io.github.abeatrizsc.study_gamification_ms.services.OptionService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/games/quizzes/questions/options")
public class OptionController {
    private OptionService service;

    @GetMapping("/all")
    public ResponseEntity<List<Option>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Option> findById(@PathVariable String id) {
        return ResponseEntity.ok(service.findById(id));
    }
}
