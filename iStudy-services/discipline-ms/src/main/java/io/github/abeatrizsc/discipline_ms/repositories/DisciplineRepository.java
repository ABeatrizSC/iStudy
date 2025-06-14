package io.github.abeatrizsc.discipline_ms.repositories;

import io.github.abeatrizsc.discipline_ms.domain.Discipline;
import io.github.abeatrizsc.discipline_ms.enums.DisciplineCategoryEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DisciplineRepository extends JpaRepository<Discipline, String> {
    Optional<Discipline> findByNameAndCreatedBy(String name, String userId);
    Optional<Discipline> findByTopicsNameAndCreatedBy(String topicName, String userId);
    List<Discipline> findAllByCategory(DisciplineCategoryEnum category);
    List<Discipline> findByNameContaining(String query);
    List<Discipline> findByIsCompletedTrue();
    void deleteAllByCreatedBy(String userId);
}
