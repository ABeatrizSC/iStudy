package io.github.abeatrizsc.study_gamification_ms.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cards")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @JsonIgnore
    @Column(name = "created_by")
    private String createdBy;

    @Column
    private String question;

    @Column
    private String answer;

    @Column(name = "is_hit")
    private Boolean isHit = false;

    @ManyToOne
    @JoinColumn(name = "flashcard_id")
    @JsonBackReference
    private Flashcard flashcard;
}
