package io.github.abeatrizsc.discipline_ms.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public enum DisciplineCategoryEnum {
    EXACT_SCIENCES(1),
    HUMAN_SCIENCES(2),
    BIOLOGICAL_SCIENCES(3),
    SOCIAL_SCIENCES(4),
    HEALTH_SCIENCES(5),
    ARTS_AND_HUMANITIES(6);

    @Getter
    private final int code;

    public static DisciplineCategoryEnum fromCode(int code) {
        for (DisciplineCategoryEnum category : DisciplineCategoryEnum.values()) {
            if (category.getCode() == code) {
                return category;
            }
        }
        throw new IllegalArgumentException("Invalid code: " + code);
    }
}
