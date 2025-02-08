package io.github.abeatrizsc.discipline_ms.mapper;

import io.github.abeatrizsc.discipline_ms.domain.Discipline;
import io.github.abeatrizsc.discipline_ms.dtos.DisciplineRequestDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface DisciplineMapper {
    DisciplineMapper INSTANCE = Mappers.getMapper(DisciplineMapper.class);

    Discipline convertDtoToEntity(DisciplineRequestDto dto);
}
