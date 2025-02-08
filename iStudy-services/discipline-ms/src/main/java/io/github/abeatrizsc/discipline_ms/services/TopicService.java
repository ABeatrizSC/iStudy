package io.github.abeatrizsc.discipline_ms.services;

import io.github.abeatrizsc.discipline_ms.domain.Topic;
import io.github.abeatrizsc.discipline_ms.dtos.TopicRequestDto;
import io.github.abeatrizsc.discipline_ms.dtos.TopicResponseDto;
import io.github.abeatrizsc.discipline_ms.dtos.TopicUpdateDto;
import io.github.abeatrizsc.discipline_ms.exceptions.NameConflictException;
import io.github.abeatrizsc.discipline_ms.mapper.TopicMapper;
import io.github.abeatrizsc.discipline_ms.repositories.DisciplineRepository;
import io.github.abeatrizsc.discipline_ms.repositories.TopicRepository;
import io.github.abeatrizsc.discipline_ms.utils.AuthRequestUtils;
import jakarta.ws.rs.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
public class TopicService {
    private TopicRepository topicRepository;
    private DisciplineRepository disciplineRepository;
    private TopicMapper topicMapper;
    private AuthRequestUtils authRequestUtils;

    @Transactional
    public void save(TopicRequestDto requestDto) throws NameConflictException {
        Topic topic = topicMapper.convertRequestDtoToEntity(requestDto);

        if (topicNameAlreadyExists(topic.getName(), topic.getDiscipline().getCreatedBy())) {
            throw new NameConflictException("topic");
        }

        topicRepository.save(topic);
    }

    @Transactional
    public TopicResponseDto update(String id, TopicUpdateDto updateDto) throws NameConflictException {
        Topic topic = topicMapper.convertResponseDtoToEntity(findById(id));

        String userCreator = topic.getDiscipline().getCreatedBy();

        if (!authRequestUtils.isRequestFromCreator(userCreator)) {
            throw new SecurityException();
        }

        if (topicNameAlreadyExists(updateDto.getName(), topic.getDiscipline().getCreatedBy())) {
            throw new NameConflictException("topic");
        }

        topic.setName(updateDto.getName());
        topic.setIsCompleted(updateDto.getIsCompleted());

        topicRepository.save(topic);

        return topicMapper.convertEntityToResponseDto(topic);
    }

    @Transactional
    public void delete(String id) {
        Topic topic = topicMapper.convertResponseDtoToEntity(findById(id));

        String userCreator = topic.getDiscipline().getCreatedBy();

        if (!authRequestUtils.isRequestFromCreator(userCreator)) {
            throw new SecurityException();
        }

        topicRepository.delete(topic);
    }

    public List<TopicResponseDto> findAll() {
        return topicRepository
                .findAll()
                .stream()
                .filter(t -> Objects.equals(t.getDiscipline().getCreatedBy(), authRequestUtils.getRequestUserId()))
                .map(topicMapper::convertEntityToResponseDto)
                .toList();
    }

    public TopicResponseDto findById(String id) {
        Topic topic = topicRepository.findById(id).orElseThrow(() -> new NotFoundException("Topic"));

        String userCreator = topic.getDiscipline().getCreatedBy();

        if (!authRequestUtils.isRequestFromCreator(userCreator)) {
            throw new SecurityException();
        }

        return topicMapper.convertEntityToResponseDto(topic);
    }

    public Boolean topicNameAlreadyExists(String topicName, String userId) {
        return disciplineRepository.findByTopicsNameAndCreatedBy(topicName, userId).isPresent();
    }
}
