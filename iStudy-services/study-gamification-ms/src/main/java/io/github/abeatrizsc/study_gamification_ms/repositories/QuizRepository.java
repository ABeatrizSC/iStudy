package io.github.abeatrizsc.study_gamification_ms.repositories;

import io.github.abeatrizsc.study_gamification_ms.domain.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, String> {
    Optional<Quiz> findByTitle(String title);
    Optional<Quiz> findByTitleAndCreatedBy(String title, String createdBy);
}
