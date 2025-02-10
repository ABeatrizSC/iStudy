package io.github.abeatrizsc.discipline_ms.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TopicResponseDto {
    private String id;
    private String name;
    private LocalTime time;
    private Boolean isCompleted;
    private String disciplineId;
}
