package com.io.github.abeatrisc.study_planner_ms.mappers;

import com.io.github.abeatrisc.study_planner_ms.domain.ScheduleItem;
import com.io.github.abeatrisc.study_planner_ms.dtos.ScheduleItemRequestDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ScheduleItemMapper {
    ScheduleItemMapper INSTANCE = Mappers.getMapper(ScheduleItemMapper.class);

    ScheduleItem convertRequestDtoToEntity(ScheduleItemRequestDto requestDto);
}
