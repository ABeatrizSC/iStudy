package io.github.abeatrizsc.study_gamification_ms.services;

import io.github.abeatrizsc.study_gamification_ms.domain.*;
import io.github.abeatrizsc.study_gamification_ms.dtos.*;
import io.github.abeatrizsc.study_gamification_ms.exceptions.ConflictException;
import io.github.abeatrizsc.study_gamification_ms.exceptions.NotFoundException;
import io.github.abeatrizsc.study_gamification_ms.repositories.CardRepository;
import io.github.abeatrizsc.study_gamification_ms.repositories.FlashcardRepository;
import io.github.abeatrizsc.study_gamification_ms.utils.AuthRequestUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@AllArgsConstructor
public class FlashcardService {
    private FlashcardRepository repository;
    private CardRepository cardRepository;
    private AuthRequestUtils authRequestUtils;

    @Transactional
    public List<Flashcard> create(FlashcardRequestDto requestDto) throws ConflictException {
        if (flashcardAlreadyExists(requestDto.getTitle(), null)) {
            throw new ConflictException("flashcard name");
        }

        Flashcard newFlashcard = new Flashcard();
        newFlashcard.setTitle(requestDto.getTitle());
        newFlashcard.setCreatedBy(authRequestUtils.getUserId());

        List<Card> cards = requestDto.getCards().stream().map(cDto -> {
                Card card = new Card();
                card.setCreatedBy(newFlashcard.getCreatedBy());
                card.setQuestion(cDto.getQuestion());
                card.setAnswer(cDto.getAnswer());
                card.setFlashcard(newFlashcard);

                return card;
            }
        ).toList();

        newFlashcard.setCards(cards);
        repository.save(newFlashcard);

        return findAll();
    }

    @Transactional
    public List<Flashcard> update(String id, FlashcardRequestDto requestDto) throws ConflictException {
        Flashcard flashcard = findById(id);

        if (flashcardAlreadyExists(requestDto.getTitle(), flashcard.getId())) {
            throw new ConflictException("flashcard name");
        }

        flashcard.setTitle(requestDto.getTitle());

        flashcard.getCards().clear();

        requestDto.getCards().forEach(cDto -> {
            Card card = new Card();
            card.setQuestion(cDto.getQuestion());
            card.setAnswer(cDto.getAnswer());
            card.setFlashcard(flashcard);
            card.setCreatedBy(authRequestUtils.getUserId());

            flashcard.getCards().add(card);
        });

        repository.save(flashcard);
        return findAll();
    }

    @Transactional
    public List<Flashcard> delete(String id) {
        Flashcard flashcard = findById(id);

        repository.delete(flashcard);

        return findAll();
    }

    @Transactional
    public void deleteUserData(String userId) {
        repository.deleteAllByCreatedBy(userId);
    }

    @Transactional
    public List<Card> answer(String id, FlashcardAnswerDto answerDto) {
        Flashcard flashcard = findById(id);

        for (Card card : flashcard.getCards()) {
            for (CardAnswerDto cardAnswer : answerDto.getCardsAnswer()) {
                if (card.getId().equals(cardAnswer.getId())) {
                    card.setIsHit(cardAnswer.getIsHit());
                    break;
                }
            }
        }

        repository.save(flashcard);

        return cardRepository.findByIsHitAndFlashcardId(false, flashcard.getId());
    }

    public List<Flashcard> findAll(){
        return repository
                .findAll()
                .stream()
                .filter(f -> authRequestUtils.isRequestFromCreator(f.getCreatedBy()))
                .toList();
    }

    public Flashcard findById(String id) {
        Flashcard flashcard = repository.findById(id).orElseThrow(() -> new NotFoundException("Flashcard"));

        if (!authRequestUtils.isRequestFromCreator(flashcard.getCreatedBy())) {
            throw new NotFoundException("Flashcard");
        }

        return flashcard;
    }

    public Optional<Flashcard> findByTitle(String title) {
        Optional<Flashcard> flashcard = repository.findByTitle(title);

        if (flashcard.isEmpty() || !authRequestUtils.isRequestFromCreator(flashcard.get().getCreatedBy())) {
            throw new NotFoundException("Flashcard");
        }

        return flashcard;
    }

    public Boolean flashcardAlreadyExists(String title, String flashcardId) {
        String userId = authRequestUtils.getUserId();
        Optional<Flashcard> flashcard = repository.findByTitleAndCreatedBy(title, userId);

        if (flashcard.isEmpty() || Objects.equals(flashcard.get().getId(), flashcardId)) {
            return false;
        }

        return true;
    }
}
