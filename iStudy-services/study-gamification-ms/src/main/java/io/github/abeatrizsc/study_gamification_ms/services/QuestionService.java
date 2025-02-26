package io.github.abeatrizsc.study_gamification_ms.services;

import io.github.abeatrizsc.study_gamification_ms.domain.Question;
import io.github.abeatrizsc.study_gamification_ms.repositories.QuestionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class QuestionService {
    private QuestionRepository repository;

    public List<Question> findAll() {
        return repository.findAll();
    }

    public Question findById(String id) {
        return repository.findById(id).orElseThrow();
    }

    public Question findByQuestion(String question) {
        return repository.findByQuestion(question).orElseThrow();
    }
}
