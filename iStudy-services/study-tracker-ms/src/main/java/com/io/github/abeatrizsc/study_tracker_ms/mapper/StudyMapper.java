package com.io.github.abeatrizsc.study_tracker_ms.mapper;

import com.io.github.abeatrizsc.study_tracker_ms.domain.Study;
import com.io.github.abeatrizsc.study_tracker_ms.dtos.StudyRequestDto;
import com.io.github.abeatrizsc.study_tracker_ms.dtos.StudyResponseDto;
import com.io.github.abeatrizsc.study_tracker_ms.dtos.vo.DisciplineVo;
import com.io.github.abeatrizsc.study_tracker_ms.dtos.vo.TopicVo;
import com.io.github.abeatrizsc.study_tracker_ms.feign.DisciplineServiceClient;
import com.io.github.abeatrizsc.study_tracker_ms.utils.AuthRequestUtils;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalTime;

@Mapper(componentModel = "spring")
public abstract class StudyMapper {
    @Autowired
    DisciplineServiceClient disciplineServiceClient;
    @Autowired
    AuthRequestUtils authRequestUtils;

    @Mapping(target = "time", source = "time", qualifiedByName = "localTimeToLocalTime")
    @Mapping(target = "disciplineId", source = "disciplineName", qualifiedByName = "convertDisciplineNameToId")
    @Mapping(target = "topicId", source = "topicName", qualifiedByName = "convertTopicNameToId")
    public abstract Study convertRequestDtoToEntity(StudyRequestDto requestDto);

    @Mapping(target = "time", source = "time", qualifiedByName = "localTimeToLocalTime")
    @Mapping(target = "discipline", source = "disciplineId", qualifiedByName = "convertDisciplineIdToObj")
    public abstract StudyResponseDto convertEntityToResponseDto(Study study, @Context String topicId);

    @Named("convertDisciplineNameToId")
    public String convertDisciplineNameToId(String disciplineName) {
        String token = authRequestUtils.getAuthorizationToken();
        return disciplineServiceClient.getDisciplineByName(token, disciplineName).getId();
    }

    @Named("convertDisciplineIdToObj")
    public DisciplineVo convertDisciplineIdToObj(String disciplineId, @Context String topicId) {
        String token = authRequestUtils.getAuthorizationToken();

        DisciplineVo discipline = disciplineServiceClient.getDisciplineById(token, disciplineId);

        discipline.setTopic(convertTopicIdToObj(topicId));

        return discipline;
    }

    @Named("convertTopicNameToId")
    public String convertTopicNameToId(String topicName) {
        String token = authRequestUtils.getAuthorizationToken();
        return disciplineServiceClient.getTopicByName(token, topicName).getId();
    }

    @Named("convertTopicIdToObj")
    public TopicVo convertTopicIdToObj(String topicId) {
        String token = authRequestUtils.getAuthorizationToken();
        return disciplineServiceClient.getTopicById(token, topicId);
    }

    @Named("localTimeToLocalTime")
    LocalTime localTimeToLocalTime(LocalTime time) {
        return time != null ? time : LocalTime.MIDNIGHT;
    }
}
