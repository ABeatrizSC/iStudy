package io.github.abeatrizsc.study_gamification_ms.repositories;

import io.github.abeatrizsc.study_gamification_ms.domain.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QuestionRepository extends JpaRepository<Question, String> {
    Optional<Question> findByQuestion(String question);
}
