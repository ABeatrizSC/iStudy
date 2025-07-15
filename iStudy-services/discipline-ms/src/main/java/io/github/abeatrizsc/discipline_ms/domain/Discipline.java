package io.github.abeatrizsc.discipline_ms.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import io.github.abeatrizsc.discipline_ms.enums.DisciplineCategoryEnum;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;


@Table(name = "disciplines")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Discipline {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "created_by")
    private String createdBy;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private DisciplineCategoryEnum category;

    @Column(nullable = false, name = "total_time")
    private LocalTime totalTime = LocalTime.of(0, 0);

    @Column(nullable = false, name = "time_completed")
    private LocalTime timeCompleted = LocalTime.of(0, 0);

    @Column(nullable = false,  name = "is_completed")
    private Boolean isCompleted = false;

    @OneToMany(mappedBy = "discipline", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Topic> topics = new ArrayList<>();
}
