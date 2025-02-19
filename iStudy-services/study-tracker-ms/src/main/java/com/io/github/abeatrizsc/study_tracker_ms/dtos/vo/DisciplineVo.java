package com.io.github.abeatrizsc.study_tracker_ms.dtos.vo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalTime;
import java.util.List;

@Data
@AllArgsConstructor
public class DisciplineVo {
    private String id;
    @JsonIgnore
    private String createdBy;
    private String name;
    private String category;
    private LocalTime totalTime;
    private LocalTime timeCompleted;
    private Boolean isCompleted;
    private TopicVo topic;
    @JsonIgnore
    private List<TopicVo> topics;
}
