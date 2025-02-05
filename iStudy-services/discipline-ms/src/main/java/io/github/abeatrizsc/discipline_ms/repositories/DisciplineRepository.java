package io.github.abeatrizsc.discipline_ms.repositories;

import io.github.abeatrizsc.discipline_ms.domain.Discipline;
import io.github.abeatrizsc.discipline_ms.enums.DisciplineCategoryEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DisciplineRepository extends JpaRepository<Discipline, String> {
    Optional<List<Discipline>> findByCategory(DisciplineCategoryEnum category);
    Optional<List<Discipline>> findByNameLike(String query);
}
