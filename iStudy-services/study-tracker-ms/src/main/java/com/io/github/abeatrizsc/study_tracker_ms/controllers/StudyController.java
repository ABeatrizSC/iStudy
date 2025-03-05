package com.io.github.abeatrizsc.study_tracker_ms.controllers;

import com.io.github.abeatrizsc.study_tracker_ms.domain.Study;
import com.io.github.abeatrizsc.study_tracker_ms.dtos.StudyInfoDto;
import com.io.github.abeatrizsc.study_tracker_ms.dtos.StudyRequestDto;
import com.io.github.abeatrizsc.study_tracker_ms.dtos.StudyResponseDto;
import com.io.github.abeatrizsc.study_tracker_ms.dtos.SuccessResponseDto;
import com.io.github.abeatrizsc.study_tracker_ms.exceptions.ConflictException;
import com.io.github.abeatrizsc.study_tracker_ms.mapper.StudyMapper;
import com.io.github.abeatrizsc.study_tracker_ms.services.StudyService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/studies")
@AllArgsConstructor
public class StudyController {
    private StudyService service;
    private StudyMapper studyMapper;

    @GetMapping("/all")
    public ResponseEntity<List<StudyResponseDto>> getAll() {
        return ResponseEntity.status(HttpStatus.OK).body(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudyResponseDto> getById(@PathVariable String id) {
        Study study = service.findById(id);
        return ResponseEntity.ok(studyMapper.convertEntityToResponseDto(study, study.getTopicId()));
    }

    @GetMapping("/completed")
    public ResponseEntity<List<StudyResponseDto>> getByIsCompleted() {
        List<StudyResponseDto> studiesCompleted = service.findByIsCompletedTrue();

        return studiesCompleted.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(studiesCompleted);
    }

    @GetMapping("/date")
    public ResponseEntity<List<StudyResponseDto>> getByDate(@RequestParam String date) {
        List<StudyResponseDto> studies = service.findByDate(LocalDate.parse(date));

        return studies.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(studies);
    }

    @GetMapping("/month")
    public ResponseEntity<List<StudyResponseDto>> getByMonth(@RequestParam Integer year, @RequestParam Integer month) {
        List<StudyResponseDto> studiesPerMonth = service.findByMonth(year, month);

        return studiesPerMonth.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(studiesPerMonth);
    }

    @GetMapping("/month/info")
    public ResponseEntity<StudyInfoDto> getMonthInfo(@RequestParam Integer year, @RequestParam Integer month) {
        return ResponseEntity.ok(service.getMonthInfo(year, month));
    }

    @GetMapping("/week")
    public ResponseEntity<List<StudyResponseDto>> getByWeek(@RequestParam Integer year, @RequestParam Integer week) {
        List<StudyResponseDto> studiesPerWeek = service.findByWeek(year, week);

        return studiesPerWeek.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(studiesPerWeek);
    }

    @GetMapping("/week/info")
    public ResponseEntity<StudyInfoDto> getWeekInfo(@RequestParam Integer year, @RequestParam Integer week) {
        return ResponseEntity.ok(service.getWeekInfo(year, week));
    }

    @GetMapping("/subject-category")
    public ResponseEntity<List<StudyResponseDto>> getByDisciplineCategory(@RequestParam String category) {
        List<StudyResponseDto> studiesPerCategory = service.findByDisciplineCategory(category);

        return studiesPerCategory.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(studiesPerCategory);
    }

    @PostMapping
    public ResponseEntity<SuccessResponseDto> insert(@RequestBody @Valid StudyRequestDto requestDto) throws ConflictException {
        service.save(requestDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(new SuccessResponseDto("Study created successfully!"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudyResponseDto> updateById(@PathVariable String id, @RequestBody @Valid StudyRequestDto requestDto) throws ConflictException {
        StudyResponseDto responseDto = service.update(id, requestDto);

        return ResponseEntity.ok(responseDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<SuccessResponseDto> deleteById(@PathVariable String id) {
        service.delete(id);

        return ResponseEntity.ok(new SuccessResponseDto("Study deleted successfully!"));
    }
}
