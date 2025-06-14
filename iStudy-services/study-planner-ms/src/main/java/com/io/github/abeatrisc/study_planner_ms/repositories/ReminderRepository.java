package com.io.github.abeatrisc.study_planner_ms.repositories;

import com.io.github.abeatrisc.study_planner_ms.domain.Reminder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReminderRepository extends JpaRepository<Reminder, String> {
    List<Reminder> findByDateAndCreatedBy(LocalDate date, String createdBy);
    List<Reminder> findByIsCompletedAndCreatedBy(boolean isCompleted, String createdBy);
    void deleteAllByCreatedBy(String userId);
}