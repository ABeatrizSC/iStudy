package io.github.abeatrizsc.study_gamification_ms.services;

import io.github.abeatrizsc.study_gamification_ms.domain.Option;
import io.github.abeatrizsc.study_gamification_ms.repositories.OptionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class OptionService {
    private OptionRepository repository;

    public List<Option> findAll() {
        return repository.findAll();
    }

    public Option findById(String id) {
        return repository.findById(id).orElseThrow();
    }
}
