package com.io.github.abeatrizsc.study_tracker_ms.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UpdateDisciplineEventDto {
    private String oldName;
    private String newName;
    private String category;
}
