package io.github.abeatrizsc.discipline_ms.producer;

import io.github.abeatrizsc.discipline_ms.dtos.TopicUpdateEventDto;
import io.github.abeatrizsc.discipline_ms.dtos.UpdateDisciplineEventDto;
import io.github.abeatrizsc.discipline_ms.dtos.TopicDeleteEventDto;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class DisciplineEventPublisher {
    @Value("${rabbitmq.exchange.name}")
    private String exchangeName;

    private final RabbitTemplate rabbitTemplate;

    public DisciplineEventPublisher(@Value("${rabbitmq.exchange.name}") String exchangeName, RabbitTemplate rabbitTemplate) {
        this.exchangeName = exchangeName;
        this.rabbitTemplate = rabbitTemplate;
    }

    public void publishDisciplineUpdate(UpdateDisciplineEventDto updateDisciplineEventDto) {
        rabbitTemplate.convertAndSend(exchangeName, "discipline.update", updateDisciplineEventDto);
    }

    public void publishDisciplineDelete(String disciplineName) {
        rabbitTemplate.convertAndSend(exchangeName, "discipline.delete", disciplineName);
    }

    public void publishTopicUpdate(TopicUpdateEventDto topicEventDto) {
        rabbitTemplate.convertAndSend(exchangeName, "topic.update", topicEventDto);
    }

    public void publishTopicDelete(TopicDeleteEventDto topicEventDto) {
        rabbitTemplate.convertAndSend(exchangeName, "topic.delete", topicEventDto);
    }
}