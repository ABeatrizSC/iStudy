package io.github.abeatrizsc.discipline_ms.repositories;

import io.github.abeatrizsc.discipline_ms.domain.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TopicRepository extends JpaRepository<Topic, String> {
    @Query("SELECT t FROM Topic t JOIN t.discipline d WHERE t.name = :name AND d.createdBy = :createdBy")
    Optional<Topic> findByNameAndCreatedBy(@Param("name") String name, @Param("createdBy") String createdBy);
    List<Topic> findByIsCompletedTrue();
    List<Topic> findAllByDisciplineId(String disciplineId);
}
