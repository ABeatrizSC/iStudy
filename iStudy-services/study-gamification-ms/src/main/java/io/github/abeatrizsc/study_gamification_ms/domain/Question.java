package io.github.abeatrizsc.study_gamification_ms.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "questions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column
    private String question;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "option_chosen")
    private String optionChosen = null;

    @Column(name = "correct_answer")
    private Boolean correctAnswer = false;

    @ManyToOne
    @JoinColumn(name = "quiz_id")
    @JsonBackReference
    private Quiz quiz;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<Option> options;
}
