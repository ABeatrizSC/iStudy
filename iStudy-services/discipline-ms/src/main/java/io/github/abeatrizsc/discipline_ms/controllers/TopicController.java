package io.github.abeatrizsc.discipline_ms.controllers;

import io.github.abeatrizsc.discipline_ms.dtos.TopicRequestDto;
import io.github.abeatrizsc.discipline_ms.dtos.vo.SuccessResponse;
import io.github.abeatrizsc.discipline_ms.dtos.TopicResponseDto;
import io.github.abeatrizsc.discipline_ms.dtos.TopicUpdateDto;
import io.github.abeatrizsc.discipline_ms.exceptions.NameConflictException;
import io.github.abeatrizsc.discipline_ms.services.TopicService;
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
@RequestMapping("disciplines/topics")
@AllArgsConstructor
public class TopicController {
    private TopicService topicService;

    @GetMapping
    public List<TopicResponseDto> getAll() {
        return topicService.findAll();
    }

    @GetMapping("/{id}")
    public TopicResponseDto getById(@PathVariable String id) {
        return topicService.findById(id);
    }

    @PostMapping
    public ResponseEntity<SuccessResponse> insert(@RequestBody @Valid TopicRequestDto requestDto) throws NameConflictException {
        topicService.save(requestDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(new SuccessResponse("Topic created successfully!"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TopicResponseDto> updateById(@PathVariable @Valid String id, @RequestBody TopicUpdateDto updateDto) throws NameConflictException {
        TopicResponseDto topicResponse = topicService.update(id, updateDto);

        return ResponseEntity.ok(topicResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<SuccessResponse> deleteById(@PathVariable String id) {
        topicService.delete(id);

        return ResponseEntity.status(HttpStatus.OK).body(new SuccessResponse("Topic deleted successfully!"));
    }
}
