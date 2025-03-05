package com.io.github.abeatrizsc.study_tracker_ms.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalTime;

@Data
@AllArgsConstructor
public class StudyTimeDto {
    private String name;
    private LocalTime completedTime;
}
