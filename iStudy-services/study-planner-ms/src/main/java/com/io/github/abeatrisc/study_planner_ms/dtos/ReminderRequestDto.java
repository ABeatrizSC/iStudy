package com.io.github.abeatrisc.study_planner_ms.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ReminderRequestDto {
    @NotBlank(message = "Task name must be provided.")
    @Size(min = 3, max = 35, message = "Task name must have 3 to 35 characters.")
    private String task;

    @NotNull(message = "Date must be provided.")
    private LocalDate date;

    private Boolean isCompleted;
}