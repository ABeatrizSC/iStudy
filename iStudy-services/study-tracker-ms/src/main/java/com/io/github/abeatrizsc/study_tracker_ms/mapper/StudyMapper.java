package com.io.github.abeatrizsc.study_tracker_ms.mapper;

import com.io.github.abeatrizsc.study_tracker_ms.domain.Study;
import com.io.github.abeatrizsc.study_tracker_ms.dtos.StudyRequestDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.time.LocalTime;

@Mapper(componentModel = "spring")
public abstract class StudyMapper {
    @Mapping(target = "time", source = "time", qualifiedByName = "localTimeToLocalTime")
    public abstract Study convertRequestDtoToEntity(StudyRequestDto requestDto);

    @Named("localTimeToLocalTime")
    LocalTime localTimeToLocalTime(LocalTime time) {
        return time != null ? time : LocalTime.MIDNIGHT;
    }
}
