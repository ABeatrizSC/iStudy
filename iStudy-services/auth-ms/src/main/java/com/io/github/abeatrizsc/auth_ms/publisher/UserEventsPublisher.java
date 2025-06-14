package com.io.github.abeatrizsc.auth_ms.publisher;

import com.io.github.abeatrizsc.auth_ms.dto.DeleteUserEventDto;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class UserEventsPublisher {
    @Value("${rabbitmq.exchange.name}")
    private String exchangeName;

    private final RabbitTemplate rabbitTemplate;

    public UserEventsPublisher(@Value("${rabbitmq.exchange.name}") String exchangeName, RabbitTemplate rabbitTemplate) {
        this.exchangeName = exchangeName;
        this.rabbitTemplate = rabbitTemplate;
    }

    public void publishUserDelete(DeleteUserEventDto deleteUserEventDto) {
        rabbitTemplate.convertAndSend(exchangeName, "", deleteUserEventDto);
    }
}