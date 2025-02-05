package io.github.abeatrizsc.discipline_ms.domain;

import io.github.abeatrizsc.discipline_ms.enums.DisciplineCategoryEnum;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Table(name = "disciplines")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Discipline {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(unique = true, nullable = false)
    private String name;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private DisciplineCategoryEnum category;

/*    @Column(nullable = false)
    private Time hours;*/

    @Column(nullable = false,  name = "is_completed")
    private Boolean isCompleted;
}
