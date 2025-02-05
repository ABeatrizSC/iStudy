package io.github.abeatrizsc.discipline_ms.controllers;

import io.github.abeatrizsc.discipline_ms.dtos.DisciplineRequestDto;
import io.github.abeatrizsc.discipline_ms.domain.Discipline;
import io.github.abeatrizsc.discipline_ms.dtos.SuccessResponseDto;
import io.github.abeatrizsc.discipline_ms.exceptions.DisciplineNameConflictException;
import io.github.abeatrizsc.discipline_ms.services.DisciplineService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/disciplines")
@AllArgsConstructor
public class DisciplineController {
    private DisciplineService service;

    @GetMapping
    public List<Discipline> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Discipline getById(@PathVariable String id) {
        return service.findById(id);
    }

    @PostMapping
    public ResponseEntity<SuccessResponseDto> insert(@RequestBody @Valid DisciplineRequestDto requestDto) throws DisciplineNameConflictException {
        service.save(requestDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(new SuccessResponseDto("Discipline created successfully!"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Discipline> updateById(@PathVariable String id, @Valid @RequestBody DisciplineRequestDto requestDto) {
        Discipline discipline = service.update(id, requestDto);

        return ResponseEntity.ok(discipline);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<SuccessResponseDto> deleteById(@PathVariable String id) {
        service.delete(id);

        return ResponseEntity.status(HttpStatus.OK).body(new SuccessResponseDto("Discipline deleted successfully!"));
    }
}
