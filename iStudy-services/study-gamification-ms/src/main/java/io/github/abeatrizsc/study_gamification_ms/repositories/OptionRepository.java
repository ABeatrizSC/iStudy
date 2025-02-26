package io.github.abeatrizsc.study_gamification_ms.repositories;

import io.github.abeatrizsc.study_gamification_ms.domain.Option;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OptionRepository extends JpaRepository<Option, String> {
}
