package com.io.github.abeatrizsc.study_tracker_ms.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Table(name = "studies")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Study {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false, name = "created_by")
    private String createdBy;

    @Column(nullable = false, name = "discipline_name")
    private String disciplineName;

    @Column(nullable = false, name = "topic_name")
    private String topicName;

    @Column(nullable = false, name = "discipline_category")
    private String disciplineCategory;

    @Column(nullable = false)
    private LocalTime time;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private Boolean isCompleted;
}
