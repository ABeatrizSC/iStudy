package io.github.abeatrizsc.study_gamification_ms.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "flashcards")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Flashcard {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "created_by")
    private String createdBy;

    @Column
    private String title;

    @OneToMany(mappedBy = "flashcard", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<Card> cards;
}
