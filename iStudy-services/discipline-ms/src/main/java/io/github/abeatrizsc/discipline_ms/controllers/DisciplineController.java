package io.github.abeatrizsc.discipline_ms.controllers;

import io.github.abeatrizsc.discipline_ms.dtos.DisciplineRequestDto;
import io.github.abeatrizsc.discipline_ms.domain.Discipline;
import io.github.abeatrizsc.discipline_ms.dtos.vo.SuccessResponse;
import io.github.abeatrizsc.discipline_ms.enums.DisciplineCategoryEnum;
import io.github.abeatrizsc.discipline_ms.exceptions.NameConflictException;
import io.github.abeatrizsc.discipline_ms.services.DisciplineService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/disciplines")
@AllArgsConstructor
public class DisciplineController {
    private DisciplineService service;

    @GetMapping
    public ResponseEntity<Discipline> getByName(@RequestParam String name) {
        return ResponseEntity.ok(service.findByName(name));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Discipline>> getAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Discipline> getById(@PathVariable String id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<SuccessResponse> insert(@RequestBody @Valid DisciplineRequestDto requestDto) throws NameConflictException {
        service.save(requestDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(new SuccessResponse("Subject created successfully!"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Discipline> updateById(@PathVariable String id, @RequestBody @Valid  DisciplineRequestDto requestDto) throws NameConflictException {
        Discipline discipline = service.update(id, requestDto);

        return ResponseEntity.ok(discipline);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<SuccessResponse> deleteById(@PathVariable String id) {
        service.delete(id);

        return ResponseEntity.status(HttpStatus.OK).body(new SuccessResponse("Subject deleted successfully!"));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Discipline>> getAllByCategory(@PathVariable String category) {
        List<Discipline> disciplines = service.findAllByCategory(DisciplineCategoryEnum.valueOf(category));

        return disciplines.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(disciplines);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Discipline>> searchByName(@RequestParam String name) {
        List<Discipline> disciplines = service.findByNameContaining(name);

        return disciplines.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(disciplines);
    }

    @GetMapping("/completed")
    public ResponseEntity<List<Discipline>> getAllByIsCompletedTrue() {
        List<Discipline> disciplines = service.findByIsCompletedTrue();

        return disciplines.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(disciplines);
    }
}
