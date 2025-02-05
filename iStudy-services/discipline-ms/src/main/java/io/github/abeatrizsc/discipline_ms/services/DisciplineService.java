package io.github.abeatrizsc.discipline_ms.services;

import io.github.abeatrizsc.discipline_ms.domain.Discipline;
import io.github.abeatrizsc.discipline_ms.dtos.DisciplineRequestDto;
import io.github.abeatrizsc.discipline_ms.enums.DisciplineCategoryEnum;
import io.github.abeatrizsc.discipline_ms.exceptions.DisciplineNameConflictException;
import io.github.abeatrizsc.discipline_ms.exceptions.DisciplineNotFoundException;
import io.github.abeatrizsc.discipline_ms.mapper.DisciplineMapper;
import io.github.abeatrizsc.discipline_ms.repositories.DisciplineRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class DisciplineService {
    private DisciplineRepository repository;

    @Transactional
    public void save(DisciplineRequestDto requestDto) throws DisciplineNameConflictException {
        Discipline discipline = DisciplineMapper.INSTANCE.convertDtoToEntity(requestDto);

        if (repository.findByName(discipline.getName()).isPresent()) {
            throw new DisciplineNameConflictException();
        }

        repository.save(discipline);
    }

    @Transactional
    public Discipline update(String id, DisciplineRequestDto requestDto) {
        Discipline discipline = repository.findById(id).orElseThrow(DisciplineNotFoundException::new);

        discipline.setName(requestDto.getName());
        discipline.setCategory(requestDto.getCategory());

        repository.save(discipline);

        return discipline;
    }

    @Transactional
    public void delete(String id) {
        Discipline discipline = repository.findById(id).orElseThrow();

        repository.delete(discipline);
    }

    public List<Discipline> findAll() {
        return repository.findAll();
    }

    public Discipline findById(String id) {
        return repository.findById(id).orElseThrow(DisciplineNotFoundException::new);
    }

    public Optional<List<Discipline>> findByCategory(DisciplineCategoryEnum category) {
        return repository.findByCategory(category);
    }

    public Optional<List<Discipline>> findByNameLike(String query) {
        return repository.findByNameLike(query);
    }
}
