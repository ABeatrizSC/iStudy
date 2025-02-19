package com.io.github.abeatrizsc.study_tracker_ms.services;

import com.io.github.abeatrizsc.study_tracker_ms.domain.Study;
import com.io.github.abeatrizsc.study_tracker_ms.dtos.StudyRequestDto;
import com.io.github.abeatrizsc.study_tracker_ms.dtos.StudyResponseDto;
import com.io.github.abeatrizsc.study_tracker_ms.mapper.StudyMapper;
import com.io.github.abeatrizsc.study_tracker_ms.repositories.StudyRepository;
import com.io.github.abeatrizsc.study_tracker_ms.utils.AuthRequestUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
public class StudyService {
    private StudyRepository repository;
    private StudyMapper studyMapper;
    private AuthRequestUtils authRequestUtils;

    @Transactional
    public void save(StudyRequestDto requestDto) {
        Study study = studyMapper.convertRequestDtoToEntity(requestDto);
        study.setCreatedBy(authRequestUtils.getRequestUserId());

        repository.save(study);
    }

    @Transactional
    public StudyResponseDto update(String id, StudyRequestDto requestDto) {
        Study studyUpdated = studyMapper.convertRequestDtoToEntity(requestDto);
        Study study = findById(id);

        study.setDisciplineId(studyUpdated.getDisciplineId());
        study.setTopicId(studyUpdated.getTopicId());
        study.setTime(studyUpdated.getTime());
        study.setDate(studyUpdated.getDate());
        study.setIsCompleted(studyUpdated.getIsCompleted());

        repository.save(study);

        return studyMapper.convertEntityToResponseDto(study, study.getTopicId());
    }

    @Transactional
    public void delete(String id) {
        repository.deleteById(id);
    }

    public List<Study> findAll() {
        return repository
                .findAll()
                .stream()
                .filter(s -> Objects.equals(s.getCreatedBy(), authRequestUtils.getRequestUserId()))
                .toList();
    }

    public Study findById(String id) {
        return repository.findById(id).orElseThrow(RuntimeException::new);
    }

    /*
    * - Find by name
    * - Find by Discipline category
    * - Find by Date
    * - Find by Month
    * - Find by is Completed = true
    */
}
