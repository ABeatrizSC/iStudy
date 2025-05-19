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

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.YearMonth;
import java.time.temporal.WeekFields;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class StudyService {
    private StudyRepository repository;
    private StudyMapper studyMapper;
    private AuthRequestUtils authRequestUtils;
    private DisciplineServiceClient disciplineServiceClient;

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
                .filter(s -> authRequestUtils.isRequestFromCreator(s.getCreatedBy()))
                .filter(s -> s.getDisciplineCategory().equals(category))
                .toList();
    }

    public Boolean studyAlreadyExists(Study study) {
        Optional<Study> newStudy = repository.findByDisciplineNameAndTopicNameAndDateAndCreatedBy(study.getDisciplineName(), study.getTopicName(), study.getDate(), study.getCreatedBy());

        if (newStudy.isEmpty() || Objects.equals(newStudy.get().getId(), study.getId())) {
            return false;
        }

        return true;
    }

    public LocalTime getTotalDailyStudyTime(LocalDate date) {
        List<Study> dailyStudies = findByDate(date);

        return calcTotalStudyTime(dailyStudies);
    }

    public List<StudyTimeDto> getDailyCompletedStudyTimeByDiscipline(LocalDate date) {
        List<Study> dailyStudies = findByDate(date);

        return calcCompletedStudyTimeByDiscipline(dailyStudies);
    }

    public List<StudyTimeDto> getDailyCompletedStudyTimeByDisciplineCategory(LocalDate date) {
        List<Study> dailyStudies = findByDate(date);

        return calcCompletedStudyTimeByCategory(dailyStudies);
    }

    public LocalTime getTotalMonthlyStudyTime(Integer year, Integer month) {
        List<Study> monthlyStudies = findByMonth(year, month);

        return calcTotalStudyTime(monthlyStudies);
    }

    public LocalTime getMonthlyCompletedStudyTime(Integer year, Integer month) {
        List<Study> monthlyStudies = findByMonth(year, month);

        return calcCompletedStudyTime(monthlyStudies);
    }

    public List<StudyTimeDto> getMonthlyCompletedStudyTimeByDiscipline(Integer year, Integer month) {
        List<Study> monthlyStudies = findByMonth(year, month);

        return calcCompletedStudyTimeByDiscipline(monthlyStudies);
    }

    public List<StudyTimeDto> getMonthlyCompletedStudyTimeByDisciplineCategory(Integer year, Integer month) {
        List<Study> monthlyStudies = findByMonth(year, month);

        return calcCompletedStudyTimeByCategory(monthlyStudies);
    }

    public LocalTime getTotalWeeklyStudyTime(Integer year, Integer week) {
        List<Study> weeklyStudies = findByWeek(year, week);

        return calcTotalStudyTime(weeklyStudies);
    }

    public LocalTime getDailyCompletedStudyTime(LocalDate date) {
        List<Study> dailyStudies = findByDate(date);

        return calcCompletedStudyTime(dailyStudies);
    }

    public LocalTime getWeeklyCompletedStudyTime(Integer year, Integer week) {
        List<Study> weeklyStudies = findByWeek(year, week);

        return calcCompletedStudyTime(weeklyStudies);
    }

    public List<StudyTimeDto> getWeeklyCompletedStudyTimeByDiscipline(Integer year, Integer week) {
        List<Study> weeklyStudies = findByWeek(year, week);

        return calcCompletedStudyTimeByDiscipline(weeklyStudies);
    }

    public List<StudyTimeDto> getWeeklyCompletedStudyTimeByDisciplineCategory(Integer year, Integer week) {
        List<Study> weeklyStudies = findByWeek(year, week);

        return calcCompletedStudyTimeByCategory(weeklyStudies);
    }

    private LocalTime calcTotalStudyTime (List<Study> studies) {
        LocalTime totalTime = LocalTime.of(0, 0);

        return studies
                .stream()
                .map(Study::getTime)
                .reduce(totalTime, (total, time) -> total.plusHours(time.getHour()).plusMinutes(time.getMinute()));
    }

    private LocalTime calcCompletedStudyTime (List<Study> studies) {
        LocalTime totalTime = LocalTime.of(0, 0);

        return studies
                .stream()
                .filter(Study::getIsCompleted)
                .map(Study::getTime)
                .reduce(totalTime, (total, time) -> total.plusHours(time.getHour()).plusMinutes(time.getMinute()));
    }

    private List<StudyTimeDto> calcCompletedStudyTimeByDiscipline(List<Study> studies) {
        String token = authRequestUtils.getToken();
        List<DisciplineVo> allDisciplines = disciplineServiceClient.getAll(token).getBody();

        Map<String, LocalTime> disciplineTimeMap = allDisciplines.stream()
                .collect(Collectors.toMap(
                        DisciplineVo::getName,
                        d -> LocalTime.of(0, 0)
                ));

        for (Study study : studies) {
            if (study.getIsCompleted()) {
                LocalTime studyTime = study.getTime();

                disciplineTimeMap.put(study.getDisciplineName(),
                        disciplineTimeMap.getOrDefault(study.getDisciplineName(), LocalTime.of(0, 0))
                                .plusHours(studyTime.getHour())
                                .plusMinutes(studyTime.getMinute())
                );
            }
        }

        return disciplineTimeMap.entrySet().stream()
                .map(entry -> new StudyTimeDto(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }

    private List<StudyTimeDto> calcCompletedStudyTimeByCategory(List<Study> studies) {
        String token = authRequestUtils.getToken();
        List<String> allCategories = disciplineServiceClient.getAllCategories(token).getBody();

        // Initialize all categories with 00:00h
        Map<String, LocalTime> disciplineTimeMap = allCategories.stream()
                .collect(Collectors.toMap(
                        category -> category,
                        category -> LocalTime.of(0, 0)
                ));

        //Sum time
        for (Study study : studies) {
            if (study.getIsCompleted()) {
                String disciplineCategory = study.getDisciplineCategory();
                LocalTime studyTime = study.getTime();

                disciplineTimeMap.put(
                        disciplineCategory,
                        disciplineTimeMap.getOrDefault(disciplineCategory, LocalTime.of(0, 0))
                                .plusHours(studyTime.getHour())
                                .plusMinutes(studyTime.getMinute())
                );
            }
        }

        return disciplineTimeMap.entrySet().stream()
                .map(entry -> new StudyTimeDto(entry.getKey(), entry.getValue()))
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
                LocalTime completedTime = calcCompletedStudyTime(dailyStudies);
                LocalTime totalTime = calcTotalStudyTime(dailyStudies);

                if (totalTime.getHour() == 0 && totalTime.getMinute() == 0) {
                    statusList.add(new DailyStudyStatusDto(date, false, true));
                } else {
                    boolean metGoal = !completedTime.isBefore(totalTime);
                    statusList.add(new DailyStudyStatusDto(date, metGoal, true));
                }
            }
        }

        return statusList;
    }
}