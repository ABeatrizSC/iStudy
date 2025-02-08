package io.github.abeatrizsc.discipline_ms.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TopicUpdateDto {
    @NotBlank(message = "Topic name is required.")
    @Size(min = 3, max = 35, message = "The topic name must have 3 to 35 characters.")
    private String name;
    private Boolean isCompleted;
}
