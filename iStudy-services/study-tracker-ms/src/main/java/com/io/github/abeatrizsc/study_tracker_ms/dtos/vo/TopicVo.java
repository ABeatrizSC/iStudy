package com.io.github.abeatrizsc.study_tracker_ms.dtos.vo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalTime;

@Data
@AllArgsConstructor
public class TopicVo {
    private String id;
    private String name;
    private LocalTime time;
    private Boolean isCompleted;
    @JsonIgnore
    private String disciplineId;
}
