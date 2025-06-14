package com.io.github.abeatrisc.study_planner_ms.services;

import com.io.github.abeatrisc.study_planner_ms.domain.Reminder;
import com.io.github.abeatrisc.study_planner_ms.dtos.ReminderRequestDto;
import com.io.github.abeatrisc.study_planner_ms.exceptions.NotFoundException;
import com.io.github.abeatrisc.study_planner_ms.mappers.ReminderMapper;
import com.io.github.abeatrisc.study_planner_ms.repositories.ReminderRepository;
import com.io.github.abeatrisc.study_planner_ms.utils.AuthRequestUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
public class ReminderService {
    private final ReminderRepository repository;
    private final AuthRequestUtils authRequestUtils;

    public List<Reminder> save(ReminderRequestDto requestDto) {
        Reminder newReminder = ReminderMapper.INSTANCE.convertRequestDtoToEntity(requestDto);
        newReminder.setCreatedBy(authRequestUtils.getUserId());

        repository.save(newReminder);

        return findAll();
    }

    public List<Reminder> update(String id, ReminderRequestDto requestDto) throws NotFoundException {
        Reminder reminder = findById(id);

        reminder.setTask(requestDto.getTask());
        reminder.setDate(requestDto.getDate());
        reminder.setIsCompleted(requestDto.getIsCompleted());

        repository.save(reminder);

        return findAll();
    }

    public List<Reminder> deleteById(String id) throws NotFoundException {
        findById(id);

        repository.deleteById(id);

        return findAll();
    }

    @Transactional
    public void deleteUserData(String userId) {
        repository.deleteAllByCreatedBy(userId);
    }

    public Reminder findById(String id) throws NotFoundException {
        Reminder reminder = repository.findById(id).orElseThrow(() -> new NotFoundException("Reminder"));

        if(!authRequestUtils.isRequestFromCreator(reminder.getCreatedBy())) {
            throw new NotFoundException("Reminder");
        }

        return reminder;
    }

    public List<Reminder> findAll() {
        return repository.findAll()
                .stream()
                .filter(r -> authRequestUtils.isRequestFromCreator(r.getCreatedBy()))
                .toList();
    }

    public List<Reminder> findAllByDate(LocalDate date) {
        String userId = authRequestUtils.getUserId();
        return repository.findByDateAndCreatedBy(date, userId);
    }

    public List<Reminder> findAllByIsCompleted(Boolean isCompleted) {
        String userId = authRequestUtils.getUserId();
        return repository.findByIsCompletedAndCreatedBy(isCompleted, userId);
    }
}