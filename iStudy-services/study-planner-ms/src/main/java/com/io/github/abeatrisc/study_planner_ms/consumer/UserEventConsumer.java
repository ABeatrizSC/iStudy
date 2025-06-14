package com.io.github.abeatrisc.study_planner_ms.consumer;

import com.io.github.abeatrisc.study_planner_ms.dtos.DeleteUserEventDto;
import com.io.github.abeatrisc.study_planner_ms.services.ReminderService;
import com.io.github.abeatrisc.study_planner_ms.services.ScheduleItemService;
import lombok.AllArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class UserEventConsumer {
    private ReminderService reminderService;
    private ScheduleItemService scheduleItemService;

    @RabbitListener(queues = {"${rabbitmq.queue.user-deleted}"})
    public void consumeUserDelete(@Payload DeleteUserEventDto deleteEventDto) {
        reminderService.deleteUserData(deleteEventDto.getUserId());
        scheduleItemService.deleteUserData(deleteEventDto.getUserId());
    }
}