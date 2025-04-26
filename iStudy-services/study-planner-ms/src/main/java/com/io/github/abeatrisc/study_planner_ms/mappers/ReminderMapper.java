package com.io.github.abeatrisc.study_planner_ms.mappers;

import com.io.github.abeatrisc.study_planner_ms.domain.Reminder;
import com.io.github.abeatrisc.study_planner_ms.dtos.ReminderRequestDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ReminderMapper {
    ReminderMapper INSTANCE = Mappers.getMapper(ReminderMapper.class);

    Reminder convertRequestDtoToEntity(ReminderRequestDto requestDto);
}