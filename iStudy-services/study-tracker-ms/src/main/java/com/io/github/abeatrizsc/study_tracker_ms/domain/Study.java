package com.io.github.abeatrizsc.study_tracker_ms.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Table(name = "studies")
@Entity
@Data
@AllArgsConstructor
public class Study {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String disciplineId;

    @Column(nullable = false)
    private String topicId;

    @Column(nullable = false)
    private LocalTime time;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private Boolean isCompleted;
}
