package io.github.abeatrizsc.discipline_ms.mapper;

import io.github.abeatrizsc.discipline_ms.domain.Discipline;
import io.github.abeatrizsc.discipline_ms.domain.Topic;
import io.github.abeatrizsc.discipline_ms.dtos.TopicRequestDto;
import io.github.abeatrizsc.discipline_ms.dtos.TopicResponseDto;
import io.github.abeatrizsc.discipline_ms.services.DisciplineService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalTime;

@Mapper(componentModel = "spring")
public abstract class TopicMapper {
    @Autowired
    private DisciplineService disciplineService;

    @Mapping(target = "time", source = "time", qualifiedByName = "localTimeToLocalTime")
    @Mapping(target = "discipline", expression = "java(disciplineConverterToObj(dto.getDisciplineId()))")
    public abstract Topic convertRequestDtoToEntity(TopicRequestDto dto);

    @Mapping(target = "time", source = "time", qualifiedByName = "localTimeToLocalTime")
    @Mapping(target = "discipline", expression = "java(disciplineConverterToObj(dto.getDisciplineId()))")
    public abstract Topic convertResponseDtoToEntity(TopicResponseDto dto);

    @Mapping(target = "time", source = "time", qualifiedByName = "localTimeToLocalTime")
    @Mapping(target = "disciplineId", expression = "java(disciplineConverterToId(entity.getDiscipline()))")
    public abstract TopicResponseDto convertEntityToResponseDto(Topic entity);

    String disciplineConverterToId(Discipline discipline) {
        return discipline.getId();
    }

    Discipline disciplineConverterToObj(String id) {
        return disciplineService.findById(id);
    }

    @Named("localTimeToLocalTime")
    LocalTime localTimeToLocalTime(LocalTime time) {
        return time != null ? time : LocalTime.MIDNIGHT;
    }
}
