package com.io.github.abeatrizsc.study_tracker_ms.consumer;

import com.io.github.abeatrizsc.study_tracker_ms.domain.Study;
import com.io.github.abeatrizsc.study_tracker_ms.dtos.TopicUpdateEventDto;
import com.io.github.abeatrizsc.study_tracker_ms.dtos.UpdateDisciplineEventDto;
import com.io.github.abeatrizsc.study_tracker_ms.dtos.TopicDeleteEventDto;
import com.io.github.abeatrizsc.study_tracker_ms.repositories.StudyRepository;
import lombok.AllArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@AllArgsConstructor
public class DisciplineEventConsumer {
    private StudyRepository studyRepository;

    @RabbitListener(queues = {"${rabbitmq.queue.discipline.update.name}"})
    public void consumeDisciplineUpdate(@Payload UpdateDisciplineEventDto updateEventDto) {
        List<Study> studies = studyRepository.findByDisciplineName(updateEventDto.getOldName());

        if (!studies.isEmpty()) {
            for (Study study : studies) {
                study.setDisciplineName(updateEventDto.getNewName());
                study.setDisciplineCategory(updateEventDto.getCategory());
                studyRepository.save(study);
            }
        }
    }

    @RabbitListener(queues = {"${rabbitmq.queue.discipline.delete.name}"})
    public void consumeDisciplineDelete(@Payload String name) {
        List<Study> studies = studyRepository.findByDisciplineName(name);

        if (!studies.isEmpty()) {
            for (Study study : studies) {
                studyRepository.delete(study);
            }
        }
    }

    @RabbitListener(queues = {"${rabbitmq.queue.topic.update.name}"})
    public void consumeTopicUpdate(@Payload TopicUpdateEventDto topicEventDto) {
        List<Study> studies = studyRepository.findByDisciplineNameAndTopicName(topicEventDto.getDisciplineName(), topicEventDto.getTopicName());

        if (!studies.isEmpty()) {
            for (Study study : studies) {
                study.setTopicName(topicEventDto.getTopicNewName());
                studyRepository.save(study);
            }
        }
    }

    @RabbitListener(queues = {"${rabbitmq.queue.topic.delete.name}"})
    public void consumeTopicDelete(@Payload TopicDeleteEventDto topicEventDto) {
        List<Study> studies = studyRepository.findByDisciplineNameAndTopicName(topicEventDto.getDisciplineName(), topicEventDto.getTopicName());

        if (!studies.isEmpty()) {
            for (Study study : studies) {
                studyRepository.delete(study);
            }
        }
    }
}
