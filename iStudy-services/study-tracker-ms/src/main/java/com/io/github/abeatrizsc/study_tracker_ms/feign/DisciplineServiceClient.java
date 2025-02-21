package com.io.github.abeatrizsc.study_tracker_ms.feign;

import com.io.github.abeatrizsc.study_tracker_ms.dtos.vo.DisciplineVo;
import com.io.github.abeatrizsc.study_tracker_ms.dtos.vo.TopicVo;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "discipline-ms", path = "/disciplines")
public interface DisciplineServiceClient {
    @GetMapping("/{id}")
    ResponseEntity<DisciplineVo> getDisciplineById(@RequestHeader("Authorization") String token, @PathVariable String id);

    @GetMapping
    ResponseEntity<DisciplineVo> getDisciplineByName(@RequestHeader("Authorization") String token, @RequestParam String name);

    @GetMapping("/topics/{id}")
    ResponseEntity<TopicVo> getTopicById(@RequestHeader("Authorization") String token, @PathVariable String id);

    @GetMapping("/topics")
    ResponseEntity<TopicVo> getTopicByName(@RequestHeader("Authorization") String token, @RequestParam String name);
}
