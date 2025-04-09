package io.github.abeatrizsc.discipline_ms.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TopicDeleteEventDto {
    private String disciplineName;
    private String topicName;
}