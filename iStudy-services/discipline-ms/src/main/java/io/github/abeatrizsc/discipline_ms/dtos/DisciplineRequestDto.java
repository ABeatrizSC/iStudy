package io.github.abeatrizsc.discipline_ms.dtos;

import io.github.abeatrizsc.discipline_ms.enums.DisciplineCategoryEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DisciplineRequestDto {
    private String name;
    private DisciplineCategoryEnum category;
    private Boolean isCompleted;
}
