package io.github.abeatrizsc.study_gamification_ms.dto;

import lombok.Data;

import java.util.List;

@Data
public class QuestionRequestDto {
    private String question;
    private String optionChosen;
    private List<OptionRequestDto> options;
}