package com.io.github.abeatrizsc.study_tracker_ms.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TopicUpdateEventDto {
    private String disciplineName;
    private String topicName;
    private String topicNewName;
}
