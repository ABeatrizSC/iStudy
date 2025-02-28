package io.github.abeatrizsc.study_gamification_ms.services;

import io.github.abeatrizsc.study_gamification_ms.domain.Option;
import io.github.abeatrizsc.study_gamification_ms.exceptions.NotFoundException;
import io.github.abeatrizsc.study_gamification_ms.repositories.OptionRepository;
import io.github.abeatrizsc.study_gamification_ms.utils.AuthRequestUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class OptionService {
    private OptionRepository repository;
    private AuthRequestUtils authRequestUtils;

    public List<Option> findAll() {
        return repository
                .findAll()
                .stream()
                .filter(q -> authRequestUtils.isRequestFromCreator(q.getCreatedBy()))
                .toList();
    }

    public Option findById(String id) {
        Option option = repository.findById(id).orElseThrow();

        if (!authRequestUtils.isRequestFromCreator(option.getCreatedBy())) {
            throw new NotFoundException("Option");
        }

        return option;
    }
}
