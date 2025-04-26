package com.io.github.abeatrisc.study_planner_ms.dtos;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalTime;

@Data
public class ScheduleItemRequestDto{
    @NotBlank(message = "Item name is required.")
    private String title;

    @NotNull(message = "Day of week is required.")
    @Min(value = 0, message = "Invalid day of week. Must be between 0 (Sunday) and 6 (Saturday).")
    @Max(value = 6, message = "Invalid day of week. Must be between 0 (Sunday) and 6 (Saturday).")
    private Integer dayOfWeek;

    @NotNull(message = "Start time is Required.")
    private LocalTime startTime;

    @NotNull(message = "End time is Required.")
    private LocalTime endTime;
}
