package com.io.github.abeatrizsc.study_tracker_ms.controllers;

import com.io.github.abeatrizsc.study_tracker_ms.domain.Study;
import com.io.github.abeatrizsc.study_tracker_ms.dtos.DailyStudyStatusDto;
import com.io.github.abeatrizsc.study_tracker_ms.dtos.StudyInfoDto;
import com.io.github.abeatrizsc.study_tracker_ms.dtos.StudyRequestDto;
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
    public ResponseEntity<List<Study>> getAll() {
        return ResponseEntity.status(HttpStatus.OK).body(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Study> getById(@PathVariable String id) {
        Study study = service.findById(id);
        return ResponseEntity.ok(study);
    }

    @GetMapping("/completed")
    public ResponseEntity<List<Study>> getByIsCompleted() {
        List<Study> studiesCompleted = service.findByIsCompletedTrue();

        return studiesCompleted.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(studiesCompleted);
    }

    @GetMapping("/date")
    public ResponseEntity<List<Study>> getByDate(@RequestParam String date) {
        List<Study> studies = service.findByDate(LocalDate.parse(date));

        return studies.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(studies);
    }

    @GetMapping("/date/info")
    public ResponseEntity<StudyInfoDto> getByDateInfo(@RequestParam String date) {
        return ResponseEntity.ok(service.getDayInfo(LocalDate.parse(date)));
    }

    @GetMapping("/month")
    public ResponseEntity<List<Study>> getByMonth(@RequestParam Integer year, @RequestParam Integer month) {
        List<Study> studiesPerMonth = service.findByMonth(year, month);

        return studiesPerMonth.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(studiesPerMonth);
    }

    @GetMapping("/month/info")
    public ResponseEntity<StudyInfoDto> getMonthInfo(@RequestParam Integer year, @RequestParam Integer month) {
        return ResponseEntity.ok(service.getMonthInfo(year, month));
    }

    @GetMapping("/week")
    public ResponseEntity<List<Study>> getByWeek(@RequestParam Integer year, @RequestParam Integer week) {
        List<Study> studiesPerWeek = service.findByWeek(year, week);

        return studiesPerWeek.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(studiesPerWeek);
    }

    @GetMapping("/week/info")
    public ResponseEntity<StudyInfoDto> getWeekInfo(@RequestParam Integer year, @RequestParam Integer week) {
        return ResponseEntity.ok(service.getWeekInfo(year, week));
    }

    @GetMapping("/subject-category")
    public ResponseEntity<List<Study>> getByDisciplineCategory(@RequestParam String category) {
        List<Study> studiesPerCategory = service.findByDisciplineCategory(category);

        return studiesPerCategory.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(studiesPerCategory);
    }

    @GetMapping("/status")
    public ResponseEntity<List<DailyStudyStatusDto>> getStudyStatusBetweenDates(@RequestParam String startDate, @RequestParam String endDate) {
        List<DailyStudyStatusDto> result = service.getStudyStatusBetweenDates(LocalDate.parse(startDate), LocalDate.parse(endDate));

        return result.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(result);
    }

    @PostMapping
    public ResponseEntity<List<Study>> insert(@RequestBody @Valid StudyRequestDto requestDto) throws ConflictException {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(requestDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<List<Study>> updateById(@PathVariable String id, @RequestBody @Valid StudyRequestDto requestDto) throws ConflictException {
        return ResponseEntity.ok(service.update(id, requestDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<List<Study>> deleteById(@PathVariable String id) {
        return ResponseEntity.ok(service.delete(id));
    }
}
