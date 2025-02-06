package io.github.abeatrizsc.discipline_ms.repositories;

import io.github.abeatrizsc.discipline_ms.domain.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TopicRepository extends JpaRepository<Topic, String> {
}
