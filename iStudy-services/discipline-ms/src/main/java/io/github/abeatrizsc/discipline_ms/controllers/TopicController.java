package io.github.abeatrizsc.discipline_ms.controllers;

import io.github.abeatrizsc.discipline_ms.dtos.TopicRequestDto;
import io.github.abeatrizsc.discipline_ms.dtos.TopicResponseDto;
import io.github.abeatrizsc.discipline_ms.dtos.TopicUpdateDto;
import io.github.abeatrizsc.discipline_ms.exceptions.ConflictException;
import io.github.abeatrizsc.discipline_ms.services.TopicService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("disciplines/topics")
@AllArgsConstructor
public class TopicController {
    private TopicService topicService;

    @GetMapping
    public ResponseEntity<TopicResponseDto> getByName(@RequestParam String name) {
        return ResponseEntity.ok(topicService.findByName(name));
    }

    @GetMapping("/all")
    public ResponseEntity<List<TopicResponseDto>> getAll() {
        return ResponseEntity.ok(topicService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TopicResponseDto> getById(@PathVariable String id) {
        return ResponseEntity.ok(topicService.findById(id));
    }

    @PostMapping
    public ResponseEntity<List<TopicResponseDto>> insert(@RequestBody @Valid TopicRequestDto requestDto) throws ConflictException {
        return ResponseEntity.status(HttpStatus.CREATED).body(topicService.save(requestDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<List<TopicResponseDto>> updateById(@PathVariable @Valid String id, @RequestBody TopicUpdateDto updateDto) throws ConflictException {
        return ResponseEntity.ok(topicService.update(id, updateDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<List<TopicResponseDto>> deleteById(@PathVariable String id) {
        return ResponseEntity.ok(topicService.delete(id));
    }
}
