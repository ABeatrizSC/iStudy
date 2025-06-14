package io.github.abeatrizsc.study_gamification_ms.consumer;

import io.github.abeatrizsc.study_gamification_ms.dtos.DeleteUserEventDto;
import io.github.abeatrizsc.study_gamification_ms.services.FlashcardService;
import io.github.abeatrizsc.study_gamification_ms.services.QuizService;
import lombok.AllArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class UserEventConsumer {
    private QuizService quizService;
    private FlashcardService flashcardService;

    @RabbitListener(queues = {"${rabbitmq.queue.user-deleted}"})
    public void consumeUserDelete(@Payload DeleteUserEventDto deleteEventDto) {
        quizService.deleteUserData(deleteEventDto.getUserId());
        flashcardService.deleteUserData(deleteEventDto.getUserId());
    }
}