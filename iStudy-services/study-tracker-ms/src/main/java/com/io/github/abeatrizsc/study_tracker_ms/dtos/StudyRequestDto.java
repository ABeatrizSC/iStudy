package com.io.github.abeatrizsc.study_tracker_ms.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudyRequestDto {
    @NotBlank(message = "Subject name is required.")
    private String disciplineName;

    @NotBlank(message = "Topic name is required.")
    private String topicName;

    @NotNull(message = "Study time is required.")
    private LocalTime time;

    @NotNull(message = "Study date is required.")
    private LocalDate date;

    private Boolean isCompleted;
}
