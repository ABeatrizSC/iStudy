package com.io.github.abeatrizsc.study_tracker_ms.repositories;

import com.io.github.abeatrizsc.study_tracker_ms.domain.Study;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface StudyRepository extends JpaRepository<Study, String> {
    List<Study> findByIsCompletedTrue();
    List<Study> findByDate(LocalDate date);
    List<Study> findByDateBetween(LocalDate start, LocalDate end);
    Optional<Study> findByDisciplineNameAndTopicNameAndDateAndCreatedBy(String disciplineName, String topicName, LocalDate date, String createdBy);
    List<Study> findByDisciplineName(String disciplineName);
    List<Study> findByDisciplineNameAndTopicName(String disciplineName, String topicName);
}
