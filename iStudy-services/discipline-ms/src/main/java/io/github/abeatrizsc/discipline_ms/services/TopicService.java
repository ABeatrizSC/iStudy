package io.github.abeatrizsc.discipline_ms.services;

import io.github.abeatrizsc.discipline_ms.domain.Topic;
import io.github.abeatrizsc.discipline_ms.dtos.TopicRequestDto;
import io.github.abeatrizsc.discipline_ms.dtos.TopicResponseDto;
import io.github.abeatrizsc.discipline_ms.dtos.TopicUpdateDto;
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
    private TopicRepository topicRepository;
    private TopicMapper topicMapper;
    private AuthRequestUtils authRequestUtils;


    @Transactional
    public void save(TopicRequestDto requestDto) {
        Topic topic = topicMapper.convertRequestDtoToEntity(requestDto);

        topicRepository.save(topic);
    }

    @Transactional
    public TopicResponseDto update(String id, TopicUpdateDto updateDto) {
        Topic topic = topicMapper.convertResponseDtoToEntity(findById(id));

        String userCreator = topic.getDiscipline().getCreatedBy();

        if (!authRequestUtils.isRequestFromCreator(userCreator)) {
            throw new SecurityException();
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
        Topic topic = topicRepository.findById(id).orElseThrow(() -> new RuntimeException("Topic not found."));

        String userCreator = topic.getDiscipline().getCreatedBy();

        if (!authRequestUtils.isRequestFromCreator(userCreator)) {
            throw new SecurityException();
        }

        return topicMapper.convertEntityToResponseDto(topic);
    }
}
