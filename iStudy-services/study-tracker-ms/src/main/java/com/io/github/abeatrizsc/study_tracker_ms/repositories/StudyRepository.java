package com.io.github.abeatrizsc.study_tracker_ms.repositories;

import com.io.github.abeatrizsc.study_tracker_ms.domain.Study;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudyRepository extends JpaRepository<Study, String> {
}
