package com.io.github.abeatrizsc.study_tracker_ms.services;

import com.io.github.abeatrizsc.study_tracker_ms.domain.Study;
import com.io.github.abeatrizsc.study_tracker_ms.dtos.DailyStudyStatusDto;
import com.io.github.abeatrizsc.study_tracker_ms.dtos.StudyInfoDto;
import com.io.github.abeatrizsc.study_tracker_ms.dtos.StudyRequestDto;
import com.io.github.abeatrizsc.study_tracker_ms.dtos.StudyTimeDto;
import com.io.github.abeatrizsc.study_tracker_ms.dtos.vo.DisciplineVo;
import com.io.github.abeatrizsc.study_tracker_ms.exceptions.ConflictException;
import com.io.github.abeatrizsc.study_tracker_ms.exceptions.NotFoundException;
import com.io.github.abeatrizsc.study_tracker_ms.feign.DisciplineServiceClient;
import com.io.github.abeatrizsc.study_tracker_ms.mapper.StudyMapper;
import com.io.github.abeatrizsc.study_tracker_ms.repositories.StudyRepository;
import com.io.github.abeatrizsc.study_tracker_ms.utils.AuthRequestUtils;
import feign.FeignException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.time.temporal.WeekFields;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
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
    private DisciplineServiceClient disciplineServiceClient;
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("HH:mm");

    @Transactional
    public List<Study> save(StudyRequestDto requestDto) throws ConflictException {
        String token = authRequestUtils.getToken();

        Study study = studyMapper.convertRequestDtoToEntity(requestDto);
        study.setCreatedBy(authRequestUtils.getUserId());

        try {
            DisciplineVo discipline = disciplineServiceClient.getDisciplineByName(token, requestDto.getDisciplineName()).getBody();
            study.setDisciplineCategory(discipline.getCategory());
            disciplineServiceClient.getTopicByName(token, requestDto.getTopicName()).getBody();

        } catch (FeignException e) {
            throw new NotFoundException("Topic or Subject");
        }


        if (studyAlreadyExists(study)) {
            throw new ConflictException("study");
        }

        repository.save(study);
        return findAll();
    }

    @Transactional
    public List<Study> update(String id, StudyRequestDto requestDto) throws ConflictException {
        String token = authRequestUtils.getToken();
        Study studyUpdated = studyMapper.convertRequestDtoToEntity(requestDto);
        Study study = findById(id);

        try {
            DisciplineVo discipline = disciplineServiceClient.getDisciplineByName(token, requestDto.getDisciplineName()).getBody();
            study.setDisciplineCategory(discipline.getCategory());
            disciplineServiceClient.getTopicByName(token, requestDto.getTopicName()).getBody();
        } catch (FeignException e) {
            throw new NotFoundException("Topic or Subject");
        }

        study.setDisciplineName(studyUpdated.getDisciplineName());
        study.setTopicName(studyUpdated.getTopicName());
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
    public List<Study> delete(String id) {
        Study study = findById(id);

        repository.delete(study);
        return findAll();
    }

    public List<Study> findAll() {
        return repository
                .findAll()
                .stream()
                .filter(s -> authRequestUtils.isRequestFromCreator(s.getCreatedBy()))
                .toList();
    }

    public Study findById(String id) {
        Study study = repository.findById(id).orElseThrow(() -> new NotFoundException("Study"));

        if (!authRequestUtils.isRequestFromCreator(study.getCreatedBy())) {
            throw new SecurityException();
        }

        return study;
    }

    public List<Study> findByDate(LocalDate date) {
        return repository.findByDate(date)
                .stream()
                .filter(s -> authRequestUtils.isRequestFromCreator(s.getCreatedBy()))
                .toList();
    }

    public List<Study> findByIsCompletedTrue() {
        return repository.findByIsCompletedTrue()
                .stream()
                .filter(s -> authRequestUtils.isRequestFromCreator(s.getCreatedBy()))
                .toList();
    }

    public List<Study> findByMonth(Integer year, Integer month) {
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = YearMonth.of(year, month).atEndOfMonth();

        return repository.findByDateBetween(startDate, endDate)
                .stream()
                .filter(s -> authRequestUtils.isRequestFromCreator(s.getCreatedBy()))
                .toList();
    }

    public List<Study> findByWeek(Integer year, Integer week) {
        LocalDate startDate = LocalDate.of(year, 1, 1)
                .with(WeekFields.of(Locale.getDefault()).weekOfYear(), week)
                .with(WeekFields.of(Locale.getDefault()).dayOfWeek(), 1);

        LocalDate endDate = startDate.plusDays(6);

        return repository.findByDateBetween(startDate, endDate)
                .stream()
                .filter(s -> authRequestUtils.isRequestFromCreator(s.getCreatedBy()))
                .toList();
    }

    public List<Study> findByDisciplineCategory(String category) {
        return findAll()
                .stream()
                .filter(s -> s.getDisciplineCategory().equals(category))
                .toList();
    }

    public Boolean studyAlreadyExists(Study study) {
        Optional<Study> newStudy = repository.findByDisciplineNameAndTopicNameAndDateAndCreatedBy(study.getDisciplineName(), study.getTopicName(), study.getDate(), study.getCreatedBy());

        return newStudy.isPresent() && !Objects.equals(newStudy.get().getId(), study.getId());
    }

    public String convertDurationToStringTime(Duration duration) {
        if (duration == null) return null;
        long hours = duration.toHours();
        long minutes = duration.toMinutesPart();
        return String.format("%02d:%02d", hours, minutes);
    }

    public Duration convertStringTimeToDuration(String dbData) {
        if (dbData == null || dbData.isBlank()) return Duration.ZERO;
        LocalTime time = LocalTime.parse(dbData, FORMATTER);
        return Duration.ofHours(time.getHour()).plusMinutes(time.getMinute());
    }

    private Duration convertLocalTimeToDuration(Study study) {
        LocalTime time = study.getTime();
        return Duration.ofHours(time.getHour()).plusMinutes(time.getMinute()).plusSeconds(time.getSecond());
    }

    public String getTotalDailyStudyTime(LocalDate date) {
        List<Study> dailyStudies = findByDate(date);

        return convertDurationToStringTime(calcTotalStudyTime(dailyStudies));
    }

    public List<StudyTimeDto> getDailyCompletedStudyTimeByDiscipline(LocalDate date) {
        List<Study> dailyStudies = findByDate(date);

        return calcCompletedStudyTimeByDiscipline(dailyStudies);
    }

    public List<StudyTimeDto> getDailyCompletedStudyTimeByDisciplineCategory(LocalDate date) {
        List<Study> dailyStudies = findByDate(date);

        return calcCompletedStudyTimeByCategory(dailyStudies);
    }

    public String getTotalMonthlyStudyTime(Integer year, Integer month) {
        List<Study> monthlyStudies = findByMonth(year, month);

        return convertDurationToStringTime(calcTotalStudyTime(monthlyStudies));
    }

    public String getMonthlyCompletedStudyTime(Integer year, Integer month) {
        List<Study> monthlyStudies = findByMonth(year, month);

        return convertDurationToStringTime(calcCompletedStudyTime(monthlyStudies));
    }

    public List<StudyTimeDto> getMonthlyCompletedStudyTimeByDiscipline(Integer year, Integer month) {
        List<Study> monthlyStudies = findByMonth(year, month);

        return calcCompletedStudyTimeByDiscipline(monthlyStudies);
    }

    public List<StudyTimeDto> getMonthlyCompletedStudyTimeByDisciplineCategory(Integer year, Integer month) {
        List<Study> monthlyStudies = findByMonth(year, month);

        return calcCompletedStudyTimeByCategory(monthlyStudies);
    }

    public String getTotalWeeklyStudyTime(Integer year, Integer week) {
        List<Study> weeklyStudies = findByWeek(year, week);

        return convertDurationToStringTime(calcTotalStudyTime(weeklyStudies));
    }

    public String getDailyCompletedStudyTime(LocalDate date) {
        List<Study> dailyStudies = findByDate(date);

        return convertDurationToStringTime(calcCompletedStudyTime(dailyStudies));
    }

    public String getWeeklyCompletedStudyTime(Integer year, Integer week) {
        List<Study> weeklyStudies = findByWeek(year, week);

        return convertDurationToStringTime(calcCompletedStudyTime(weeklyStudies));
    }

    public List<StudyTimeDto> getWeeklyCompletedStudyTimeByDiscipline(Integer year, Integer week) {
        List<Study> weeklyStudies = findByWeek(year, week);

        return calcCompletedStudyTimeByDiscipline(weeklyStudies);
    }

    public List<StudyTimeDto> getWeeklyCompletedStudyTimeByDisciplineCategory(Integer year, Integer week) {
        List<Study> weeklyStudies = findByWeek(year, week);

        return calcCompletedStudyTimeByCategory(weeklyStudies);
    }

    private Duration calcTotalStudyTime(List<Study> studies) {
        return studies
                .stream()
                .map(this::convertLocalTimeToDuration)
                .reduce(Duration.ZERO, Duration::plus);
    }

    private Duration calcCompletedStudyTime(List<Study> studies) {
        return studies
                .stream()
                .filter(Study::getIsCompleted)
                .map(this::convertLocalTimeToDuration)
                .reduce(Duration.ZERO, Duration::plus);
    }

    private List<StudyTimeDto> calcCompletedStudyTimeByDiscipline(List<Study> studies) {
        String token = authRequestUtils.getToken();
        List<DisciplineVo> allDisciplines = disciplineServiceClient.getAll(token).getBody();

        // initialize with duration = 0
        Map<String, Duration> disciplineTimeMap = allDisciplines.stream()
                .collect(Collectors.toMap(
                        DisciplineVo::getName,
                        d -> Duration.ZERO
                ));

        // sum completed studies
        for (Study study : studies) {
            if (study.getIsCompleted()) {
                String disciplineName = study.getDisciplineName();
                LocalTime studyTime = study.getTime();
                Duration duration = Duration.ofHours(studyTime.getHour())
                        .plusMinutes(studyTime.getMinute())
                        .plusSeconds(studyTime.getSecond());

                disciplineTimeMap.put(
                        disciplineName,
                        disciplineTimeMap.getOrDefault(disciplineName, Duration.ZERO).plus(duration)
                );
            }
        }

        return disciplineTimeMap.entrySet().stream()
                .map(entry -> new StudyTimeDto(entry.getKey(), convertDurationToStringTime(entry.getValue())))
                .collect(Collectors.toList());
    }

    private List<StudyTimeDto> calcCompletedStudyTimeByCategory(List<Study> studies) {
        String token = authRequestUtils.getToken();
        List<String> allCategories = disciplineServiceClient.getAllCategories(token).getBody();

        Map<String, Duration> disciplineTimeMap = allCategories.stream()
                .collect(Collectors.toMap(
                        category -> category,
                        category -> Duration.ZERO
                ));

        for (Study study : studies) {
            if (study.getIsCompleted()) {
                String disciplineCategory = study.getDisciplineCategory();
                LocalTime studyTime = study.getTime();
                Duration duration = Duration.ofHours(studyTime.getHour())
                        .plusMinutes(studyTime.getMinute())
                        .plusSeconds(studyTime.getSecond());

                disciplineTimeMap.put(
                        disciplineCategory,
                        disciplineTimeMap.getOrDefault(disciplineCategory, Duration.ZERO).plus(duration)
                );
            }
        }

        return disciplineTimeMap.entrySet().stream()
                .map(entry -> new StudyTimeDto(entry.getKey(), convertDurationToStringTime(entry.getValue())))
                .collect(Collectors.toList());
    }

    public List<Integer> getDailyStudiesQuantity(LocalDate date) {
        List<Study> studies = findByDate(date);
        int total = studies.size();
        int completed = (int) studies.stream().filter(Study::getIsCompleted).count();

        return Arrays.asList(total, completed);
    }

    public List<Integer> getWeeklyStudiesQuantity(Integer year, Integer week) {
        List<Study> studies = findByWeek(year, week);
        int total = studies.size();
        int completed = (int) studies.stream().filter(Study::getIsCompleted).count();

        return Arrays.asList(total, completed);
    }

    public List<Integer> getMonthlyStudiesQuantity(Integer year, Integer month) {
        List<Study> studies = findByMonth(year, month);
        int total = studies.size();
        int completed = (int) studies.stream().filter(Study::getIsCompleted).count();

        return Arrays.asList(total, completed);
    }

    public StudyInfoDto getDayInfo(LocalDate date) {
        StudyInfoDto studyInfoDto = new StudyInfoDto();
        List<Integer> stats = getDailyStudiesQuantity(date);

        studyInfoDto.setTotalStudies(stats.get(0));
        studyInfoDto.setTotalCompletedStudies(stats.get(1));
        studyInfoDto.setTotalStudyTime(getTotalDailyStudyTime(date));
        studyInfoDto.setCompletedStudyTime(getDailyCompletedStudyTime(date));
        studyInfoDto.setCompletedStudyTimeByDiscipline(getDailyCompletedStudyTimeByDiscipline(date));
        studyInfoDto.setCompletedStudyTimeByDisciplineCategory(getDailyCompletedStudyTimeByDisciplineCategory(date));

        return studyInfoDto;
    }

    public StudyInfoDto getWeekInfo(Integer year, Integer week) {
        StudyInfoDto studyInfoDto = new StudyInfoDto();
        List<Integer> stats = getWeeklyStudiesQuantity(year, week);

        studyInfoDto.setTotalStudies(stats.get(0));
        studyInfoDto.setTotalCompletedStudies(stats.get(1));
        studyInfoDto.setTotalStudyTime(getTotalWeeklyStudyTime(year, week));
        studyInfoDto.setCompletedStudyTime(getWeeklyCompletedStudyTime(year, week));
        studyInfoDto.setCompletedStudyTimeByDiscipline(getWeeklyCompletedStudyTimeByDiscipline(year, week));
        studyInfoDto.setCompletedStudyTimeByDisciplineCategory(getWeeklyCompletedStudyTimeByDisciplineCategory(year, week));

        return studyInfoDto;
    }

    public StudyInfoDto getMonthInfo(Integer year, Integer month) {
        StudyInfoDto studyInfoDto = new StudyInfoDto();
        List<Integer> stats = getMonthlyStudiesQuantity(year, month);

        studyInfoDto.setTotalStudies(stats.get(0));
        studyInfoDto.setTotalCompletedStudies(stats.get(1));
        studyInfoDto.setTotalStudyTime(getTotalMonthlyStudyTime(year, month));
        studyInfoDto.setCompletedStudyTime(getMonthlyCompletedStudyTime(year, month));
        studyInfoDto.setCompletedStudyTimeByDiscipline(getMonthlyCompletedStudyTimeByDiscipline(year, month));
        studyInfoDto.setCompletedStudyTimeByDisciplineCategory(getMonthlyCompletedStudyTimeByDisciplineCategory(year, month));

        return studyInfoDto;
    }

    public List<DailyStudyStatusDto> getStudyStatusBetweenDates(LocalDate startDate, LocalDate endDate) {
        List<Study> studies = repository
                .findByDateBetween(startDate, endDate)
                .stream()
                .filter(s -> authRequestUtils.isRequestFromCreator(s.getCreatedBy()))
                .toList();

        Map<LocalDate, List<Study>> studiesByDate = studies.stream()
                .collect(Collectors.groupingBy(Study::getDate));

        List<DailyStudyStatusDto> statusList = new ArrayList<>();

        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            List<Study> dailyStudies = studiesByDate.getOrDefault(date, Collections.emptyList());

            if (dailyStudies.isEmpty()) {
                statusList.add(new DailyStudyStatusDto(date, false, false));
            } else {
                Duration completedTime = calcCompletedStudyTime(dailyStudies);
                Duration totalTime = calcTotalStudyTime(dailyStudies);

                if (totalTime.isZero()) {
                    statusList.add(new DailyStudyStatusDto(date, false, true));
                } else {
                    boolean metGoal = !completedTime.minus(totalTime).isNegative();

                    statusList.add(new DailyStudyStatusDto(date, metGoal, true));
                }
            }
        }

        return statusList;
    }
}