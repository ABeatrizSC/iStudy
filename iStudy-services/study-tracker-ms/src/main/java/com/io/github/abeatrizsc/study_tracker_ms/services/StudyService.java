package com.io.github.abeatrizsc.study_tracker_ms.services;

import com.io.github.abeatrizsc.study_tracker_ms.domain.Study;
import com.io.github.abeatrizsc.study_tracker_ms.dtos.StudyInfoDto;
import com.io.github.abeatrizsc.study_tracker_ms.dtos.StudyRequestDto;
import com.io.github.abeatrizsc.study_tracker_ms.dtos.StudyResponseDto;
import com.io.github.abeatrizsc.study_tracker_ms.dtos.StudyTimeDto;
import com.io.github.abeatrizsc.study_tracker_ms.exceptions.ConflictException;
import com.io.github.abeatrizsc.study_tracker_ms.exceptions.NotFoundException;
import com.io.github.abeatrizsc.study_tracker_ms.mapper.StudyMapper;
import com.io.github.abeatrizsc.study_tracker_ms.repositories.StudyRepository;
import com.io.github.abeatrizsc.study_tracker_ms.utils.AuthRequestUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.YearMonth;
import java.time.temporal.WeekFields;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class StudyService {
    private StudyRepository repository;
    private StudyMapper studyMapper;
    private AuthRequestUtils authRequestUtils;

    @Transactional
    public List<StudyResponseDto> save(StudyRequestDto requestDto) throws ConflictException {
        Study study = studyMapper.convertRequestDtoToEntity(requestDto);
        study.setCreatedBy(authRequestUtils.getRequestUserId());

        if (studyAlreadyExists(study)) {
            throw new ConflictException("study");
        }

        repository.save(study);
        return findAll();
    }

    @Transactional
    public List<StudyResponseDto> update(String id, StudyRequestDto requestDto) throws ConflictException {
        Study studyUpdated = studyMapper.convertRequestDtoToEntity(requestDto);
        Study study = findById(id);

        study.setDisciplineId(studyUpdated.getDisciplineId());
        study.setTopicId(studyUpdated.getTopicId());
        study.setTime(studyUpdated.getTime());
        study.setDate(studyUpdated.getDate());
        study.setIsCompleted(studyUpdated.getIsCompleted());

        if (studyAlreadyExists(study)) {
            throw new ConflictException("study");
        }

        repository.save(study);
        return findAll();
    }

    @Transactional
    public List<StudyResponseDto> delete(String id) {
        Study study = findById(id);

        repository.delete(study);
        return findAll();
    }

    public List<StudyResponseDto> findAll() {
        return repository
                .findAll()
                .stream()
                .filter(s -> authRequestUtils.isRequestFromCreator(s.getCreatedBy()))
                .map(s -> studyMapper.convertEntityToResponseDto(s, s.getTopicId()))
                .toList();
    }

    public Study findById(String id) {
        Study study = repository.findById(id).orElseThrow(() -> new NotFoundException("Study"));

        if (!authRequestUtils.isRequestFromCreator(study.getCreatedBy())) {
            throw new SecurityException();
        }

        return study;
    }

    public List<StudyResponseDto> findByDate(LocalDate date) {
        return repository.findByDate(date)
                .stream()
                .filter(s -> authRequestUtils.isRequestFromCreator(s.getCreatedBy()))
                .map(s -> studyMapper.convertEntityToResponseDto(s, s.getTopicId()))
                .toList();
    }

    public List<StudyResponseDto> findByIsCompletedTrue() {
        return repository.findByIsCompletedTrue()
                .stream()
                .filter(s -> authRequestUtils.isRequestFromCreator(s.getCreatedBy()))
                .map(s -> studyMapper.convertEntityToResponseDto(s, s.getTopicId()))
                .toList();
    }

    public List<StudyResponseDto> findByMonth(Integer year, Integer month) {
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = YearMonth.of(year, month).atEndOfMonth();

        return repository.findByDateBetween(startDate, endDate)
                .stream()
                .filter(s -> authRequestUtils.isRequestFromCreator(s.getCreatedBy()))
                .map(s -> studyMapper.convertEntityToResponseDto(s, s.getTopicId()))
                .toList();
    }

    public List<StudyResponseDto> findByWeek(Integer year, Integer week) {
        LocalDate startDate = LocalDate.of(year, 1, 1)
                .with(WeekFields.of(Locale.getDefault()).weekOfYear(), week)
                .with(WeekFields.of(Locale.getDefault()).dayOfWeek(), 1);

        LocalDate endDate = startDate.plusDays(6);

        return repository.findByDateBetween(startDate, endDate)
                .stream()
                .filter(s -> authRequestUtils.isRequestFromCreator(s.getCreatedBy()))
                .map(s -> studyMapper.convertEntityToResponseDto(s, s.getTopicId()))
                .toList();
    }

    public List<StudyResponseDto> findByDisciplineCategory(String category) {
        return findAll()
                .stream()
                .filter(s -> authRequestUtils.isRequestFromCreator(s.getCreatedBy()))
                .filter(s -> s.getDiscipline().getCategory().equals(category))
                .toList();
    }

    public Boolean studyAlreadyExists(Study study) {
        Optional<Study> newStudy = repository.findByDisciplineIdAndTopicIdAndDateAndCreatedBy(study.getDisciplineId(), study.getTopicId(), study.getDate(), study.getCreatedBy());

        if (newStudy.isEmpty() || Objects.equals(newStudy.get().getId(), study.getId())) {
            return false;
        }

        return true;
    }

    public LocalTime getTotalMonthlyStudyTime(Integer year, Integer month) {
        List<StudyResponseDto> monthlyStudies = findByMonth(year, month);

        return calcTotalStudyTime(monthlyStudies);
    }

    public LocalTime getTotalWeeklyStudyTime(Integer year, Integer week) {
        List<StudyResponseDto> weeklyStudies = findByWeek(year, week);

        return calcTotalStudyTime(weeklyStudies);
    }

    public LocalTime getMonthlyCompletedStudyTime(Integer year, Integer month) {
        List<StudyResponseDto> monthlyStudies = findByMonth(year, month);

        return calcCompletedStudyTime(monthlyStudies);
    }

    public LocalTime getWeeklyCompletedStudyTime(Integer year, Integer week) {
        List<StudyResponseDto> weeklyStudies = findByWeek(year, week);

        return calcCompletedStudyTime(weeklyStudies);
    }

    public List<StudyTimeDto> getMonthlyCompletedStudyTimeByDiscipline(Integer year, Integer month) {
        List<StudyResponseDto> monthlyStudies = findByMonth(year, month);

        return calcCompletedStudyTimeByDiscipline(monthlyStudies);
    }

    public List<StudyTimeDto> getMonthlyCompletedStudyTimeByDisciplineCategory(Integer year, Integer month) {
        List<StudyResponseDto> monthlyStudies = findByMonth(year, month);

        return calcCompletedStudyTimeByCategory(monthlyStudies);
    }

    public List<StudyTimeDto> getWeeklyCompletedStudyTimeByDiscipline(Integer year, Integer week) {
        List<StudyResponseDto> weeklyStudies = findByWeek(year, week);

        return calcCompletedStudyTimeByDiscipline(weeklyStudies);
    }

    public List<StudyTimeDto> getWeeklyCompletedStudyTimeByDisciplineCategory(Integer year, Integer week) {
        List<StudyResponseDto> weeklyStudies = findByWeek(year, week);

        return calcCompletedStudyTimeByCategory(weeklyStudies);
    }

    private LocalTime calcTotalStudyTime (List<StudyResponseDto> studies) {
        LocalTime totalTime = LocalTime.of(0, 0);

        return studies
                .stream()
                .map(StudyResponseDto::getTime)
                .reduce(totalTime, (total, time) -> total.plusHours(time.getHour()).plusMinutes(time.getMinute()));
    }

    private LocalTime calcCompletedStudyTime (List<StudyResponseDto> studies) {
        LocalTime totalTime = LocalTime.of(0, 0);

        return studies
                .stream()
                .filter(StudyResponseDto::getIsCompleted)
                .map(StudyResponseDto::getTime)
                .reduce(totalTime, (total, time) -> total.plusHours(time.getHour()).plusMinutes(time.getMinute()));
    }

    private List<StudyTimeDto> calcCompletedStudyTimeByDiscipline(List<StudyResponseDto> studies) {
        Map<String, LocalTime> disciplineTimeMap = new HashMap<>();

        for (StudyResponseDto study : studies) {
            if (study.getIsCompleted()) {
                String disciplineName = study.getDiscipline().getName();
                LocalTime studyTime = study.getTime();

                disciplineTimeMap.put(disciplineName,
                        disciplineTimeMap.getOrDefault(disciplineName, LocalTime.of(0, 0))
                                .plusHours(studyTime.getHour())
                                .plusMinutes(studyTime.getMinute()));
            }
        }

        return disciplineTimeMap.entrySet().stream()
                .map(entry -> new StudyTimeDto(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }

    private List<StudyTimeDto> calcCompletedStudyTimeByCategory(List<StudyResponseDto> studies) {
        Map<String, LocalTime> disciplineTimeMap = new HashMap<>();

        for (StudyResponseDto study : studies) {
            if (study.getIsCompleted()) {
                String disciplineCategory = study.getDiscipline().getCategory();
                LocalTime studyTime = study.getTime();

                disciplineTimeMap.put(disciplineCategory,
                        disciplineTimeMap.getOrDefault(disciplineCategory, LocalTime.of(0, 0))
                                .plusHours(studyTime.getHour())
                                .plusMinutes(studyTime.getMinute()));
            }
        }

        return disciplineTimeMap.entrySet().stream()
                .map(entry -> new StudyTimeDto(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }

    public StudyInfoDto getWeekInfo(Integer year, Integer week) {
        StudyInfoDto studyInfoDto = new StudyInfoDto();
        studyInfoDto.setTotalStudyTime(getTotalWeeklyStudyTime(year, week));
        studyInfoDto.setCompletedStudyTime(getWeeklyCompletedStudyTime(year, week));
        studyInfoDto.setCompletedStudyTimeByDiscipline(getWeeklyCompletedStudyTimeByDiscipline(year, week));
        studyInfoDto.setCompletedStudyTimeByDisciplineCategory(getWeeklyCompletedStudyTimeByDisciplineCategory(year, week));

        return studyInfoDto;
    }

    public StudyInfoDto getMonthInfo(Integer year, Integer month) {
        StudyInfoDto studyInfoDto = new StudyInfoDto();
        studyInfoDto.setTotalStudyTime(getTotalMonthlyStudyTime(year, month));
        studyInfoDto.setCompletedStudyTime(getMonthlyCompletedStudyTime(year, month));
        studyInfoDto.setCompletedStudyTimeByDiscipline(getMonthlyCompletedStudyTimeByDiscipline(year, month));
        studyInfoDto.setCompletedStudyTimeByDisciplineCategory(getMonthlyCompletedStudyTimeByDisciplineCategory(year, month));

        return studyInfoDto;
    }
}