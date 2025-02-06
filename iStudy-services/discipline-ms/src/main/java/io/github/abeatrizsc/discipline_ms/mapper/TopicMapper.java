package io.github.abeatrizsc.discipline_ms.mapper;

import io.github.abeatrizsc.discipline_ms.domain.Discipline;
import io.github.abeatrizsc.discipline_ms.domain.Topic;
import io.github.abeatrizsc.discipline_ms.dtos.TopicRequestDto;
import io.github.abeatrizsc.discipline_ms.dtos.TopicResponseDto;
import io.github.abeatrizsc.discipline_ms.services.DisciplineService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring")
public abstract class TopicMapper {
    @Autowired
    private DisciplineService disciplineService;

    @Mapping(target = "discipline", expression = "java(disciplineObjConverter(dto.getDisciplineId()))")
    public abstract Topic convertRequestDtoToEntity(TopicRequestDto dto);

    @Mapping(target = "discipline", expression = "java(disciplineObjConverter(dto.getDisciplineId()))")
    public abstract Topic convertResponseDtoToEntity(TopicResponseDto dto);

    @Mapping(target = "disciplineId", expression = "java(disciplineIdConverter(entity.getDiscipline()))")
    public abstract TopicResponseDto convertEntityToResponseDto(Topic entity);

    String disciplineIdConverter(Discipline discipline) {
        return discipline.getId();
    }

    Discipline disciplineObjConverter(String id) {
        return disciplineService.findById(id);
    }
}
