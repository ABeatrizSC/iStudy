package io.github.abeatrizsc.study_gamification_ms.services;

import io.github.abeatrizsc.study_gamification_ms.domain.Question;
import io.github.abeatrizsc.study_gamification_ms.exceptions.NotFoundException;
import io.github.abeatrizsc.study_gamification_ms.repositories.QuestionRepository;
import io.github.abeatrizsc.study_gamification_ms.utils.AuthRequestUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class QuestionService {
    private QuestionRepository repository;
    private AuthRequestUtils authRequestUtils;

    public List<Question> findAll() {
        return repository
                .findAll()
                .stream()
                .filter(q -> authRequestUtils.isRequestFromCreator(q.getCreatedBy()))
                .toList();
    }

    public Question findById(String id) {
        Question question = repository.findById(id).orElseThrow();

        if (!authRequestUtils.isRequestFromCreator(question.getCreatedBy())) {
            throw new NotFoundException("Question");
        }

        return question;
    }

    public Optional<Question> findByQuestion(String question) {
        Optional<Question> q = repository.findByQuestion(question);

        if (q.isEmpty() || !authRequestUtils.isRequestFromCreator(q.get().getCreatedBy())) {
            throw new NotFoundException("Question");
        }

        return q;
    }
}
