package com.io.github.abeatrizsc.study_tracker_ms.consumer;

import com.io.github.abeatrizsc.study_tracker_ms.dtos.DeleteUserEventDto;
import com.io.github.abeatrizsc.study_tracker_ms.services.StudyService;
import lombok.AllArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class UserEventConsumer {
    private StudyService studyService;

    @RabbitListener(queues = {"${rabbitmq.queue.user-deleted}"})
    public void consumeUserDelete(@Payload DeleteUserEventDto deleteEventDto) {
        studyService.deleteUserData(deleteEventDto.getUserId());
    }
}