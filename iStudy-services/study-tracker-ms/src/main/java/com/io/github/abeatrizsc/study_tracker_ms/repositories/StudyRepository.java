package com.io.github.abeatrizsc.study_tracker_ms.repositories;

import com.io.github.abeatrizsc.study_tracker_ms.domain.Study;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface StudyRepository extends JpaRepository<Study, String> {
    List<Study> findByIsCompletedTrue();
    List<Study> findByDate(LocalDate date);
    List<Study> findByDateBetween(LocalDate start, LocalDate end);
}
