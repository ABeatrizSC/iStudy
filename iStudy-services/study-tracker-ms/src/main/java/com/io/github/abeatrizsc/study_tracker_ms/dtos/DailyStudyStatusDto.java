package com.io.github.abeatrizsc.study_tracker_ms.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class DailyStudyStatusDto {
    private LocalDate date;
    private Boolean metGoal;
    private Boolean dayStudied;
}
