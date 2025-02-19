package com.io.github.abeatrizsc.study_tracker_ms.dtos;

import com.io.github.abeatrizsc.study_tracker_ms.dtos.vo.DisciplineVo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudyResponseDto {
    private String id;
    private String createdBy;
    private LocalTime time;
    private LocalDate date;
    private Boolean isCompleted;
    private DisciplineVo discipline;
}
