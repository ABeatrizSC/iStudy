package com.io.github.abeatrisc.study_planner_ms.controllers;

import com.io.github.abeatrisc.study_planner_ms.domain.Reminder;
import com.io.github.abeatrisc.study_planner_ms.dtos.ReminderRequestDto;
import com.io.github.abeatrisc.study_planner_ms.exceptions.NotFoundException;
import com.io.github.abeatrisc.study_planner_ms.services.ReminderService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/planners/reminders")
@AllArgsConstructor
public class ReminderController {
    private final ReminderService service;

    @GetMapping
    public ResponseEntity<List<Reminder>> getAllByDate(@RequestParam String date) {
        return ResponseEntity.ok(service.findAllByDate(LocalDate.parse(date)));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Reminder>> getAll() {
        return ResponseEntity.status(HttpStatus.OK).body(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reminder> getById(@PathVariable String id) throws NotFoundException {
        Reminder reminder = service.findById(id);
        return ResponseEntity.ok(reminder);
    }

    @GetMapping("/completed")
    public ResponseEntity<List<Reminder>> getAllByIsCompleted(@RequestParam Boolean isCompleted) {
        return ResponseEntity.ok(service.findAllByIsCompleted(isCompleted));
    }

    @PostMapping
    public ResponseEntity<List<Reminder>> insert(@RequestBody @Valid ReminderRequestDto requestDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(requestDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<List<Reminder>> updateById(@PathVariable String id, @RequestBody @Valid ReminderRequestDto requestDto) throws NotFoundException {
        return ResponseEntity.ok(service.update(id, requestDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<List<Reminder>> deleteById(@PathVariable String id) throws NotFoundException {
        return ResponseEntity.ok(service.deleteById(id));
    }
}