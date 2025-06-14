package com.io.github.abeatrisc.study_planner_ms.services;

import com.io.github.abeatrisc.study_planner_ms.domain.ScheduleItem;
import com.io.github.abeatrisc.study_planner_ms.dtos.ScheduleItemRequestDto;
import com.io.github.abeatrisc.study_planner_ms.exceptions.NotFoundException;
import com.io.github.abeatrisc.study_planner_ms.mappers.ScheduleItemMapper;
import com.io.github.abeatrisc.study_planner_ms.repositories.ScheduleItemRepository;
import com.io.github.abeatrisc.study_planner_ms.utils.AuthRequestUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class ScheduleItemService {
    private final ScheduleItemRepository repository;
    private final AuthRequestUtils authRequestUtils;

    public List<ScheduleItem> save(ScheduleItemRequestDto requestDto) {
        ScheduleItem newItem = ScheduleItemMapper.INSTANCE.convertRequestDtoToEntity(requestDto);
        newItem.setCreatedBy(authRequestUtils.getUserId());

        repository.save(newItem);

        return findAll();
    }

    public List<ScheduleItem> update(String id, ScheduleItemRequestDto requestDto) throws NotFoundException {
        ScheduleItem item = findById(id);

        item.setTitle(requestDto.getTitle());
        item.setDayOfWeek(requestDto.getDayOfWeek());
        item.setStartTime(requestDto.getStartTime());
        item.setEndTime((requestDto.getEndTime()));

        repository.save(item);

        return findAll();
    }

    public List<ScheduleItem> deleteById(String id) throws NotFoundException {
        findById(id);

        repository.deleteById(id);

        return findAll();
    }

    @Transactional
    public void deleteUserData(String userId) {
        repository.deleteAllByCreatedBy(userId);
    }

    public ScheduleItem findById(String id) throws NotFoundException {
        ScheduleItem item =  repository.findById(id).orElseThrow(() -> new NotFoundException("Item"));

        if(!authRequestUtils.isRequestFromCreator(item.getCreatedBy())) {
            throw new NotFoundException("Item");
        }

        return item;
    }

    public List<ScheduleItem> findAll() {
        return repository.findAll()
                .stream()
                .filter(s -> authRequestUtils.isRequestFromCreator(s.getCreatedBy()))
                .toList();
    }

    public List<ScheduleItem> findAllByDayOfWeek(Integer dayOfWeek) {
        return repository.findByDayOfWeekAndCreatedBy(dayOfWeek, authRequestUtils.getUserId());
    }
}
