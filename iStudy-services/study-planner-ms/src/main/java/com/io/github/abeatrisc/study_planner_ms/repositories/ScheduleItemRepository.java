package com.io.github.abeatrisc.study_planner_ms.repositories;

import com.io.github.abeatrisc.study_planner_ms.domain.ScheduleItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScheduleItemRepository extends JpaRepository<ScheduleItem, String> {
    List<ScheduleItem> findByDayOfWeekAndCreatedBy(Integer dayOfWeek, String createdBy);
}
