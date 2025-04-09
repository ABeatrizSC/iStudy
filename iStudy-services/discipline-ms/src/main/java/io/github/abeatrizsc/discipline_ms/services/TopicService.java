package io.github.abeatrizsc.discipline_ms.services;

import io.github.abeatrizsc.discipline_ms.domain.Topic;
import io.github.abeatrizsc.discipline_ms.dtos.*;
import io.github.abeatrizsc.discipline_ms.exceptions.NameConflictException;
import io.github.abeatrizsc.discipline_ms.exceptions.NotFoundException;
import io.github.abeatrizsc.discipline_ms.mapper.TopicMapper;
import io.github.abeatrizsc.discipline_ms.producer.DisciplineEventPublisher;
import io.github.abeatrizsc.discipline_ms.repositories.TopicRepository;
import io.github.abeatrizsc.discipline_ms.utils.AuthRequestUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
public class TopicService {
    private TopicRepository repository;
    private DisciplineService disciplineService;
    private TopicMapper topicMapper;
    private AuthRequestUtils authRequestUtils;
    private DisciplineEventPublisher disciplineEventPublisher;

    @Transactional
    public List<TopicResponseDto> save(TopicRequestDto requestDto) throws NameConflictException {
        Topic topic = topicMapper.convertRequestDtoToEntity(requestDto);

        if (disciplineService.topicAlreadyExistsInDiscipline(null, topic.getDiscipline().getCreatedBy(), requestDto.getName())) {
            throw new NameConflictException("topic");
        }

        repository.save(topic);

        List<TopicResponseDto> completedTopics = findAllIsCompletedTrueByDiscipline(topic.getDiscipline().getId());
        disciplineService.updateTime(completedTopics, topic.getDiscipline().getId());

        return findAll();
    }

    @Transactional
    public List<TopicResponseDto> update(String id, TopicUpdateDto updateDto) throws NameConflictException {
        Topic topic = topicMapper.convertResponseDtoToEntity(findById(id));

        if (disciplineService.topicAlreadyExistsInDiscipline(topic.getDiscipline().getId(), topic.getDiscipline().getCreatedBy(), updateDto.getName())) {
            throw new NameConflictException("topic");
        }

        TopicUpdateEventDto topicEventDto = new TopicUpdateEventDto(topic.getDiscipline().getName(), topic.getName(), updateDto.getName());
        disciplineEventPublisher.publishTopicUpdate(topicEventDto);

        topic.setName(updateDto.getName());
        topic.setIsCompleted(updateDto.getIsCompleted());
        topic.setTime(updateDto.getTime());

        repository.save(topic);

        List<TopicResponseDto> completedTopics = findAllIsCompletedTrueByDiscipline(topic.getDiscipline().getId());
        disciplineService.updateTime(completedTopics, topic.getDiscipline().getId());

        return findAll();
    }

    @Transactional
    public List<TopicResponseDto> delete(String id) {
        Topic topic = topicMapper.convertResponseDtoToEntity(findById(id));

        TopicDeleteEventDto topicEventDto = new TopicDeleteEventDto(topic.getDiscipline().getName(), topic.getName());
        disciplineEventPublisher.publishTopicDelete(topicEventDto);

        repository.delete(topic);

        List<TopicResponseDto> completedTopics = findAllIsCompletedTrueByDiscipline(topic.getDiscipline().getId());
        disciplineService.updateTime(completedTopics, topic.getDiscipline().getId());

        return findAll();
    }

    public List<TopicResponseDto> findAll() {
        return repository
                .findAll()
                .stream()
                .filter(t -> authRequestUtils.isRequestFromCreator(t.getDiscipline().getCreatedBy()))
                .map(topicMapper::convertEntityToResponseDto)
                .toList();
    }

    public List<TopicResponseDto> findAllIsCompletedTrueByDiscipline(String disciplineId) {
        return repository
                .findByIsCompletedTrue()
                .stream()
                .filter(t -> authRequestUtils.isRequestFromCreator(t.getDiscipline().getCreatedBy()))
                .filter(t ->  Objects.equals(t.getDiscipline().getId(), disciplineId))
                .map(t -> topicMapper.convertEntityToResponseDto(t))
                .toList();
    }

    public TopicResponseDto findById(String id) {
        Topic topic = repository.findById(id).orElseThrow(() -> new NotFoundException("Topic"));

        String userCreator = topic.getDiscipline().getCreatedBy();

        if (!authRequestUtils.isRequestFromCreator(userCreator)) {
            throw new SecurityException();
        }

        return topicMapper.convertEntityToResponseDto(topic);
    }

    public TopicResponseDto findByName(String name) {
        Topic topic = repository.findByNameAndCreatedBy(name, authRequestUtils.getRequestUserId()).orElseThrow(() -> new NotFoundException("Topic"));

        return topicMapper.convertEntityToResponseDto(topic);
    }
}
