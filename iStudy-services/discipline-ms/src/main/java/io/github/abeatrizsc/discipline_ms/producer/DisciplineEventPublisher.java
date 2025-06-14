package io.github.abeatrizsc.discipline_ms.producer;

import io.github.abeatrizsc.discipline_ms.dtos.TopicUpdateEventDto;
import io.github.abeatrizsc.discipline_ms.dtos.UpdateDisciplineEventDto;
import io.github.abeatrizsc.discipline_ms.dtos.TopicDeleteEventDto;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class DisciplineEventPublisher {
    @Value("${rabbitmq.exchange.discipline-events}")
    private String exchangeName;

    @Value("${rabbitmq.queue.discipline-deleted}")
    private String DISCIPLINE_EVENTS_DISCIPLINE_DELETED_QUEUE;

    @Value("${rabbitmq.queue.discipline-updated}")
    private String DISCIPLINE_EVENTS_DISCIPLINE_UPDATED_QUEUE;

    @Value("${rabbitmq.queue.topic-deleted}")
    private String DISCIPLINE_EVENTS_TOPIC_DELETED_QUEUE;

    @Value("${rabbitmq.queue.topic-updated}")
    private String DISCIPLINE_EVENTS_TOPIC_UPDATED_QUEUE;

    private final RabbitTemplate rabbitTemplate;

    public DisciplineEventPublisher(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void publishDisciplineUpdate(UpdateDisciplineEventDto updateDisciplineEventDto) {
        rabbitTemplate.convertAndSend(exchangeName, DISCIPLINE_EVENTS_DISCIPLINE_UPDATED_QUEUE, updateDisciplineEventDto);
    }

    public void publishDisciplineDelete(String disciplineName) {
        rabbitTemplate.convertAndSend(exchangeName,  DISCIPLINE_EVENTS_DISCIPLINE_DELETED_QUEUE, disciplineName);
    }

    public void publishTopicUpdate(TopicUpdateEventDto topicEventDto) {
        rabbitTemplate.convertAndSend(exchangeName, DISCIPLINE_EVENTS_TOPIC_UPDATED_QUEUE, topicEventDto);
    }

    public void publishTopicDelete(TopicDeleteEventDto topicEventDto) {
        rabbitTemplate.convertAndSend(exchangeName, DISCIPLINE_EVENTS_TOPIC_DELETED_QUEUE, topicEventDto);
    }
}