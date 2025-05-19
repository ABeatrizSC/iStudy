package com.io.github.abeatrizsc.study_tracker_ms.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudyInfoDto {
    private Integer totalStudies;
    private Integer totalCompletedStudies;
    private LocalTime totalStudyTime;
    private LocalTime completedStudyTime;
    private List<StudyTimeDto> completedStudyTimeByDiscipline;
    private List<StudyTimeDto> completedStudyTimeByDisciplineCategory;
}

