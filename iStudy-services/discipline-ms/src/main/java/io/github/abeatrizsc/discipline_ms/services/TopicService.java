package io.github.abeatrizsc.discipline_ms.services;

import io.github.abeatrizsc.discipline_ms.domain.Topic;
import io.github.abeatrizsc.discipline_ms.dtos.TopicRequestDto;
import io.github.abeatrizsc.discipline_ms.dtos.TopicResponseDto;
import io.github.abeatrizsc.discipline_ms.dtos.TopicUpdateDto;
import io.github.abeatrizsc.discipline_ms.mapper.TopicMapper;
import io.github.abeatrizsc.discipline_ms.repositories.DisciplineRepository;
import io.github.abeatrizsc.discipline_ms.repositories.TopicRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class TopicService {
    private TopicRepository topicRepository;
    private DisciplineRepository disciplineRepository;
    private TopicMapper topicMapper;

    @Transactional
    public void save(TopicRequestDto requestDto) {
        Topic topic = topicMapper.convertRequestDtoToEntity(requestDto);

        topicRepository.save(topic);
    }

    @Transactional
    public TopicResponseDto update(String id, TopicUpdateDto updateDto) {
        Topic topic = topicMapper.convertResponseDtoToEntity(findById(id));

        topic.setName(updateDto.getName());

        if (updateDto.getIsCompleted() != null) {
            topic.setIsCompleted(updateDto.getIsCompleted());
        }

        topicRepository.save(topic);

        return topicMapper.convertEntityToResponseDto(topic);
    }

    @Transactional
    public void delete(String id) {
        TopicResponseDto responseTopic = findById(id);

        topicRepository.delete(topicMapper.convertResponseDtoToEntity(responseTopic));
    }

    public List<TopicResponseDto> findAll() {
        return topicRepository
                .findAll()
                .stream()
                .map(topicMapper::convertEntityToResponseDto)
                .toList();
    }

    public TopicResponseDto findById(String id) {
        Topic topic = topicRepository.findById(id).orElseThrow(() -> new RuntimeException("Topic not found."));

        return topicMapper.convertEntityToResponseDto(topic);
    }
}
