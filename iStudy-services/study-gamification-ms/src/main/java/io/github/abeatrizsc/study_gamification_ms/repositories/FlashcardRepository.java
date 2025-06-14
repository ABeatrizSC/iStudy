package io.github.abeatrizsc.study_gamification_ms.repositories;

import io.github.abeatrizsc.study_gamification_ms.domain.Flashcard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FlashcardRepository extends JpaRepository<Flashcard, String> {
    Optional<Flashcard> findByTitle(String title);
    Optional<Flashcard> findByTitleAndCreatedBy(String title, String createdBy);

    void deleteAllByCreatedBy(String userId);
}
