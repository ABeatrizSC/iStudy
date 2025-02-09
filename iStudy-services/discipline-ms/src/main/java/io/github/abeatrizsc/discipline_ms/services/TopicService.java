package io.github.abeatrizsc.discipline_ms.services;

import io.github.abeatrizsc.discipline_ms.domain.Topic;
import io.github.abeatrizsc.discipline_ms.dtos.TopicRequestDto;
import io.github.abeatrizsc.discipline_ms.dtos.TopicResponseDto;
import io.github.abeatrizsc.discipline_ms.dtos.TopicUpdateDto;
import io.github.abeatrizsc.discipline_ms.exceptions.NameConflictException;
import io.github.abeatrizsc.discipline_ms.exceptions.NotFoundException;
import io.github.abeatrizsc.discipline_ms.mapper.TopicMapper;
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

    @Transactional
    public void save(TopicRequestDto requestDto) throws NameConflictException {
        Topic topic = topicMapper.convertRequestDtoToEntity(requestDto);

        if (disciplineService.topicAlreadyExistsInDiscipline(null, topic.getDiscipline().getCreatedBy(), requestDto.getName())) {
            throw new NameConflictException("topic");
        }

        repository.save(topic);

        List<TopicResponseDto> completedTopics = findAllIsCompletedTrueByDiscipline(topic.getDiscipline().getId());
        disciplineService.updateTime(completedTopics, topic.getDiscipline().getId());
    }

    @Transactional
    public TopicResponseDto update(String id, TopicUpdateDto updateDto) throws NameConflictException {
        Topic topic = topicMapper.convertResponseDtoToEntity(findById(id));

        String userCreator = topic.getDiscipline().getCreatedBy();
        if (!authRequestUtils.isRequestFromCreator(userCreator)) {
            throw new SecurityException();
        }

        if (disciplineService.topicAlreadyExistsInDiscipline(topic.getDiscipline().getId(), topic.getDiscipline().getCreatedBy(), updateDto.getName())) {
            throw new NameConflictException("topic");
        }

        topic.setName(updateDto.getName());
        topic.setIsCompleted(updateDto.getIsCompleted());
        topic.setTime(updateDto.getTime());

        repository.save(topic);

        List<TopicResponseDto> completedTopics = findAllIsCompletedTrueByDiscipline(topic.getDiscipline().getId());
        disciplineService.updateTime(completedTopics, topic.getDiscipline().getId());

        return topicMapper.convertEntityToResponseDto(topic);
    }

    @Transactional
    public void delete(String id) {
        Topic topic = topicMapper.convertResponseDtoToEntity(findById(id));

        String userCreator = topic.getDiscipline().getCreatedBy();

        if (!authRequestUtils.isRequestFromCreator(userCreator)) {
            throw new SecurityException();
        }

        repository.delete(topic);

        List<TopicResponseDto> completedTopics = findAllIsCompletedTrueByDiscipline(topic.getDiscipline().getId());
        disciplineService.updateTime(completedTopics, topic.getDiscipline().getId());
    }

    public List<TopicResponseDto> findAll() {
        return repository
                .findAll()
                .stream()
                .filter(t -> Objects.equals(t.getDiscipline().getCreatedBy(), authRequestUtils.getRequestUserId()))
                .map(topicMapper::convertEntityToResponseDto)
                .toList();
    }

    public List<TopicResponseDto> findAllIsCompletedTrueByDiscipline(String disciplineId) {
        return repository
                .findByIsCompletedTrue()
                .stream()
                .filter(t -> Objects.equals(t.getDiscipline().getCreatedBy(), authRequestUtils.getRequestUserId()))
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
}
