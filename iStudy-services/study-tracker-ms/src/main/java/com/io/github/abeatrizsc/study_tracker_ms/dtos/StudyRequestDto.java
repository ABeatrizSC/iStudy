package com.io.github.abeatrizsc.study_tracker_ms.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudyRequestDto {
    private String disciplineName;
    private String topicName;
    private LocalTime time;
    private LocalDate date;
    private Boolean isCompleted;
}
