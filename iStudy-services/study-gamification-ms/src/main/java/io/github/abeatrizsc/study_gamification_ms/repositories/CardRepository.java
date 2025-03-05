package io.github.abeatrizsc.study_gamification_ms.repositories;

import io.github.abeatrizsc.study_gamification_ms.domain.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CardRepository extends JpaRepository<Card, String> {
    List<Card> findByIsHitAndFlashcardId(Boolean isHit, String flashcardId);
}
