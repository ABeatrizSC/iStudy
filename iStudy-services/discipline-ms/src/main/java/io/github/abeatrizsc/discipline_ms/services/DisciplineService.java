package io.github.abeatrizsc.discipline_ms.services;

import io.github.abeatrizsc.discipline_ms.domain.Discipline;
import io.github.abeatrizsc.discipline_ms.dtos.DisciplineRequestDto;
import io.github.abeatrizsc.discipline_ms.enums.DisciplineCategoryEnum;
import io.github.abeatrizsc.discipline_ms.exceptions.NameConflictException;
import io.github.abeatrizsc.discipline_ms.mapper.DisciplineMapper;
import io.github.abeatrizsc.discipline_ms.repositories.DisciplineRepository;
import io.github.abeatrizsc.discipline_ms.utils.AuthRequestUtils;
import jakarta.ws.rs.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@AllArgsConstructor
public class DisciplineService {
    private DisciplineRepository repository;
    private AuthRequestUtils authRequestUtils;

    @Transactional
    public void save(DisciplineRequestDto requestDto) throws NameConflictException {
        Discipline discipline = DisciplineMapper.INSTANCE.convertDtoToEntity(requestDto);

        String userCreator = authRequestUtils.getRequestUserId();

        discipline.setCreatedBy(userCreator);

        if (disciplineNameAlreadyExists(discipline.getName(), discipline.getCreatedBy())) {
            throw new NameConflictException("subject");
        }

        repository.save(discipline);
    }

    @Transactional
    public Discipline update(String id, DisciplineRequestDto requestDto) throws NameConflictException {
        Discipline discipline = findById(id);

        if (!authRequestUtils.isRequestFromCreator(discipline.getCreatedBy())) {
            throw new SecurityException();
        }

        if (disciplineNameAlreadyExists(requestDto.getName(), discipline.getCreatedBy())) {
            throw new NameConflictException("subject");
        }

        discipline.setName(requestDto.getName());
        discipline.setCategory(requestDto.getCategory());
        discipline.setIsCompleted(requestDto.getIsCompleted());

        repository.save(discipline);

        return discipline;
    }

    @Transactional
    public void delete(String id) {
        Discipline discipline = findById(id);

        if (!authRequestUtils.isRequestFromCreator(discipline.getCreatedBy())) {
            throw new SecurityException();
        }

        repository.delete(discipline);
    }

    public List<Discipline> findAll() {
        return repository
                .findAll()
                .stream()
                .filter(d -> Objects.equals(d.getCreatedBy(), authRequestUtils.getRequestUserId()))
                .toList();
    }

    public Discipline findById(String id) {
        Discipline discipline = repository.findById(id).orElseThrow(() -> new NotFoundException("Subject"));

        if (!authRequestUtils.isRequestFromCreator(discipline.getCreatedBy())) {
            throw new SecurityException();
        }

        return discipline;
    }

    public List<Discipline> findAllByCategory(DisciplineCategoryEnum category) {
        return repository
                .findAllByCategory(category)
                .stream()
                .filter(d -> Objects.equals(d.getCreatedBy(), authRequestUtils.getRequestUserId()))
                .toList();
    }

    public Optional<Discipline> findByNameAndCreatedBy(String name, String userId) {
        return repository.findByNameAndCreatedBy(name, userId);
    }

    public List<Discipline> findByNameContaining(String query) {
        return repository
                .findByNameContaining(query)
                .stream()
                .filter(d -> Objects.equals(d.getCreatedBy(), authRequestUtils.getRequestUserId()))
                .toList();
    }

    public List<Discipline> findByIsCompletedTrue() {
        return repository
                .findByIsCompletedTrue()
                .stream()
                .filter(d -> Objects.equals(d.getCreatedBy(), authRequestUtils.getRequestUserId()))
                .toList();
    }

    public Boolean disciplineNameAlreadyExists(String newName, String userId) {
        return repository.findByNameAndCreatedBy(newName, userId).isPresent();
    }
}
