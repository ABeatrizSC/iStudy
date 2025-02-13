package com.io.github.abeatrizsc.study_tracker_ms.services;

import com.io.github.abeatrizsc.study_tracker_ms.repositories.StudyRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class StudyService {
    private StudyRepository repository;
}
