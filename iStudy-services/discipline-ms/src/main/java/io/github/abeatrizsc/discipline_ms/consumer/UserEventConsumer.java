package io.github.abeatrizsc.discipline_ms.consumer;

import io.github.abeatrizsc.discipline_ms.dtos.DeleteUserEventDto;
import io.github.abeatrizsc.discipline_ms.services.DisciplineService;
import lombok.AllArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class UserEventConsumer {
    private DisciplineService disciplineService;

/*    public UserEventConsumer(DisciplineService disciplineService) {
        this.disciplineService = disciplineService;
    }*/

    @RabbitListener(queues = {"${rabbitmq.queue.user-deleted}"})
    public void consumeUserDelete(@Payload DeleteUserEventDto deleteEventDto) {
        disciplineService.deleteUserData(deleteEventDto.getUserId());
    }
}