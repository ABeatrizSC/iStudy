package com.io.github.abeatrisc.study_planner_ms.controllers;

import com.io.github.abeatrisc.study_planner_ms.domain.ScheduleItem;
import com.io.github.abeatrisc.study_planner_ms.dtos.ScheduleItemRequestDto;
import com.io.github.abeatrisc.study_planner_ms.exceptions.NotFoundException;
import com.io.github.abeatrisc.study_planner_ms.services.ScheduleItemService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/planners/schedules")
@AllArgsConstructor
public class ScheduleItemController {
    private final ScheduleItemService service;

    @GetMapping
    public ResponseEntity<List<ScheduleItem>> getAllByDayOfWeek(@RequestParam Integer dayOfWeek) {
        return ResponseEntity.ok(service.findAllByDayOfWeek(dayOfWeek));
    }

    @GetMapping("/all")
    public ResponseEntity<List<ScheduleItem>> getAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ScheduleItem> getById(@PathVariable String id) throws NotFoundException {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<List<ScheduleItem>> insert(@RequestBody @Valid ScheduleItemRequestDto requestDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(requestDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<List<ScheduleItem>> updateById(@PathVariable String id, @RequestBody @Valid ScheduleItemRequestDto requestDto) throws NotFoundException {
        return ResponseEntity.ok(service.update(id, requestDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<List<ScheduleItem>> deleteById(@PathVariable String id) throws NotFoundException {
        return ResponseEntity.ok(service.deleteById(id));
    }
}
