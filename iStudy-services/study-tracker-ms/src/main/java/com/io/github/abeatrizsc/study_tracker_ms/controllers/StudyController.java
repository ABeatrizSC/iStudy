package com.io.github.abeatrizsc.study_tracker_ms.controllers;

import com.io.github.abeatrizsc.study_tracker_ms.domain.Study;
import com.io.github.abeatrizsc.study_tracker_ms.dtos.StudyRequestDto;
import com.io.github.abeatrizsc.study_tracker_ms.dtos.StudyResponseDto;
import com.io.github.abeatrizsc.study_tracker_ms.dtos.vo.SuccessResponseVo;
import com.io.github.abeatrizsc.study_tracker_ms.mapper.StudyMapper;
import com.io.github.abeatrizsc.study_tracker_ms.services.StudyService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/studies")
@AllArgsConstructor
public class StudyController {
    private StudyService service;
    private StudyMapper studyMapper;

    @GetMapping("/all")
    public ResponseEntity<List<StudyResponseDto>> getAll() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(service.findAll()
                    .stream()
                    .map(s -> studyMapper.convertEntityToResponseDto(s, s.getTopicId()))
                    .toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudyResponseDto> getById(@PathVariable String id) {
        Study study = service.findById(id);
        return ResponseEntity.ok(studyMapper.convertEntityToResponseDto(study, study.getTopicId()));
    }

    @PostMapping
    public ResponseEntity<SuccessResponseVo> insert(@RequestBody StudyRequestDto requestDto) {
        service.save(requestDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(new SuccessResponseVo("Study created successfully!"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudyResponseDto> updateById(@PathVariable String id, @RequestBody StudyRequestDto requestDto) {
        StudyResponseDto responseDto = service.update(id, requestDto);

        return ResponseEntity.ok(responseDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<SuccessResponseVo> deleteById(@PathVariable String id) {
        service.delete(id);

        return ResponseEntity.ok(new SuccessResponseVo("Study deleted successfully!"));
    }
}
