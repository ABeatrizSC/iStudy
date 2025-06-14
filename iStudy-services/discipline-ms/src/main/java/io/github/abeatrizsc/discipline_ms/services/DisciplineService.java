package io.github.abeatrizsc.discipline_ms.services;

import io.github.abeatrizsc.discipline_ms.domain.Discipline;
import io.github.abeatrizsc.discipline_ms.domain.Topic;
import io.github.abeatrizsc.discipline_ms.dtos.DisciplineRequestDto;
import io.github.abeatrizsc.discipline_ms.dtos.TopicResponseDto;
import io.github.abeatrizsc.discipline_ms.dtos.UpdateDisciplineEventDto;
import io.github.abeatrizsc.discipline_ms.enums.DisciplineCategoryEnum;
import io.github.abeatrizsc.discipline_ms.exceptions.ConflictException;
import io.github.abeatrizsc.discipline_ms.exceptions.NotFoundException;
import io.github.abeatrizsc.discipline_ms.mapper.DisciplineMapper;
import io.github.abeatrizsc.discipline_ms.producer.DisciplineEventPublisher;
import io.github.abeatrizsc.discipline_ms.repositories.DisciplineRepository;
import io.github.abeatrizsc.discipline_ms.repositories.TopicRepository;
import io.github.abeatrizsc.discipline_ms.utils.AuthRequestUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@AllArgsConstructor
public class DisciplineService {
    private DisciplineRepository repository;
    private TopicRepository topicRepository;
    private AuthRequestUtils authRequestUtils;
    private DisciplineEventPublisher disciplineEventPublisher;

    @Transactional
    public List<Discipline> save(DisciplineRequestDto requestDto) throws ConflictException {
        Discipline discipline = DisciplineMapper.INSTANCE.convertDtoToEntity(requestDto);

        String userCreator = authRequestUtils.getUserId();

        discipline.setCreatedBy(userCreator);

        if (disciplineNameAlreadyExists(null, discipline.getName(), discipline.getCreatedBy())) {
            throw new ConflictException("subject");
        }

        repository.save(discipline);

        return findAll();
    }

    @Transactional
    public List<Discipline> update(String id, DisciplineRequestDto requestDto) throws ConflictException {
        Discipline discipline = findById(id);

        if (disciplineNameAlreadyExists(discipline.getId(), requestDto.getName(), discipline.getCreatedBy())) {
            throw new ConflictException("subject");
        }

        UpdateDisciplineEventDto disciplineEventDto = new UpdateDisciplineEventDto(discipline.getName(), requestDto.getName(), requestDto.getCategory().toString());
        disciplineEventPublisher.publishDisciplineUpdate(disciplineEventDto);

        discipline.setName(requestDto.getName());
        discipline.setCategory(requestDto.getCategory());
        discipline.setIsCompleted(requestDto.getIsCompleted());

        repository.save(discipline);

        return findAll();
    }

    @Transactional
    public List<Discipline> delete(String id) {
        Discipline discipline = findById(id);

        disciplineEventPublisher.publishDisciplineDelete(discipline.getName());
        repository.delete(discipline);

        return findAll();
    }

    @Transactional
    public void deleteUserData(String userId) {
        repository.deleteAllByCreatedBy(userId);
    }

    public List<Discipline> findAll() {
        return repository
                .findAll()
                .stream()
                .filter(d -> authRequestUtils.isRequestFromCreator(d.getCreatedBy()))
                .toList();
    }

    public Discipline findById(String id) {
        Discipline discipline = repository.findById(id).orElseThrow(() -> new NotFoundException("Subject"));

        if (!authRequestUtils.isRequestFromCreator(discipline.getCreatedBy())) {
            throw new SecurityException();
        }

        return discipline;
    }

    public Discipline findByName(String name) {
        return repository.findByNameAndCreatedBy(name, authRequestUtils.getUserId()).orElseThrow(() -> new NotFoundException("Subject"));
    }

    public List<Discipline> findAllByCategory(DisciplineCategoryEnum category) {
        return repository
                .findAllByCategory(category)
                .stream()
                .filter(d -> authRequestUtils.isRequestFromCreator(d.getCreatedBy()))
                .toList();
    }

    public List<Discipline> findByNameContaining(String query) {
        return repository
                .findByNameContaining(query)
                .stream()
                .filter(d -> authRequestUtils.isRequestFromCreator(d.getCreatedBy()))
                .toList();
    }

    public List<Discipline> findByIsCompletedTrue() {
        return repository
                .findByIsCompletedTrue()
                .stream()
                .filter(d -> authRequestUtils.isRequestFromCreator(d.getCreatedBy()))
                .toList();
    }

    public List<String> getAllCategories() {
        return Arrays.stream(DisciplineCategoryEnum.values()).map( c -> c.toString()).toList();
    }

    public Boolean disciplineNameAlreadyExists(String id, String newName, String createdBy) {
        return entityAlreadyExists(repository.findByNameAndCreatedBy(newName, createdBy), id);
    }

    public Boolean topicAlreadyExistsInDiscipline(String discId, String createdBy, String topicName) {
        return entityAlreadyExists(repository.findByTopicsNameAndCreatedBy(topicName, createdBy), discId);
    }

    private Boolean entityAlreadyExists(Optional<Discipline> discipline, String id) {
        return discipline.map(d -> id == null || !Objects.equals(d.getId(), id)).orElse(false);
    }

    public void updateTime(List<TopicResponseDto> completedTopics, String disciplineId) {
        LocalTime totalTime = LocalTime.of(0, 0);
        List<Topic> topics = topicRepository.findAllByDisciplineId(disciplineId);

        totalTime = topics
                .stream()
                .map(Topic::getTime)
                .reduce(totalTime, (total, time) -> total.plusHours(time.getHour()).plusMinutes(time.getMinute()));

        Discipline discipline = findById(disciplineId);
        discipline.setTotalTime(totalTime);
        updateTimeCompleted(completedTopics, disciplineId);

        repository.save(discipline);
    }

    private void updateTimeCompleted(List<TopicResponseDto> completedTopics, String disciplineId) {
        LocalTime completedTime = LocalTime.of(0, 0);
        Discipline discipline = findById(disciplineId);

        completedTime = completedTopics
                .stream()
                .map(TopicResponseDto::getTime)
                .reduce(completedTime, (total, time) -> total.plusHours(time.getHour()).plusMinutes(time.getMinute()));

        discipline.setTimeCompleted(completedTime);
        if (!discipline.getTotalTime().equals(LocalTime.MIDNIGHT) && discipline.getTotalTime() == discipline.getTimeCompleted()) {
            discipline.setIsCompleted(true);
        } else {
            discipline.setIsCompleted(false);
        }
    }
}