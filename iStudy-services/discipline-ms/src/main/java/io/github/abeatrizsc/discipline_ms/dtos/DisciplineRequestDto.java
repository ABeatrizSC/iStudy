package io.github.abeatrizsc.discipline_ms.dtos;

import io.github.abeatrizsc.discipline_ms.enums.DisciplineCategoryEnum;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DisciplineRequestDto {
    @NotBlank(message = "Subject name is required.")
    @Size(min = 3, max = 35, message = "The subject name must have 3 to 35 characters.")
    private String name;

    @NotNull(message = "Subject category is required.")
    private DisciplineCategoryEnum category;

    private Boolean isCompleted = false;
}
