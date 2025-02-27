package io.github.abeatrizsc.study_gamification_ms.services;

import io.github.abeatrizsc.study_gamification_ms.domain.Option;
import io.github.abeatrizsc.study_gamification_ms.domain.Question;
import io.github.abeatrizsc.study_gamification_ms.domain.Quiz;
import io.github.abeatrizsc.study_gamification_ms.dtos.QuizRequestDto;
import io.github.abeatrizsc.study_gamification_ms.repositories.QuizRepository;
import io.github.abeatrizsc.study_gamification_ms.utils.AuthRequestUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class QuizService {
    private QuizRepository repository;
    private AuthRequestUtils authRequestUtils;

    @Transactional
    public List<Quiz> create(QuizRequestDto requestDto) {
        Quiz quiz = new Quiz();
        quiz.setTitle(requestDto.getTitle());
        quiz.setCreatedBy(authRequestUtils.getRequestUserId());

        List<Question> questions = requestDto.getQuestions().stream().map(qDto -> {
            Question question = new Question();
            question.setQuestion(qDto.getQuestion());
            question.setOptionChosen(qDto.getOptionChosen());
            question.setQuiz(quiz);
            question.setCreatedBy(quiz.getCreatedBy());

            List<Option> options = qDto.getOptions().stream().map(oDto -> {
                Option option = new Option();
                option.setOption(oDto.getOption());
                option.setIsCorrect(oDto.getIsCorrect());
                option.setQuestion(question);
                option.setCreatedBy(quiz.getCreatedBy());
                return option;
            }).collect(Collectors.toList());

            question.setOptions(options);
            return question;
        }).collect(Collectors.toList());

        quiz.setQuestions(questions);
        repository.save(quiz);

        return findAll();
    }

    @Transactional
    public List<Quiz> update(String id, QuizRequestDto requestDto) {
        Quiz quiz = findById(id);

        if (!authRequestUtils.isRequestFromCreator(quiz.getCreatedBy())) {
            throw new SecurityException();
        }

        quiz.setTitle(requestDto.getTitle());

        quiz.getQuestions().clear();

        requestDto.getQuestions().forEach(qDto -> {
            Question question = new Question();
            question.setQuestion(qDto.getQuestion());
            question.setOptionChosen(qDto.getOptionChosen());
            question.setQuiz(quiz);

            List<Option> options = qDto.getOptions().stream().map(oDto -> {
                Option option = new Option();
                option.setOption(oDto.getOption());
                option.setIsCorrect(oDto.getIsCorrect());
                option.setQuestion(question);
                return option;
            }).collect(Collectors.toList());

            question.setOptions(options);
            quiz.getQuestions().add(question);
        });

        repository.save(quiz);
        return findAll();
    }

    @Transactional
    public List<Quiz> delete(String id) {
        Quiz quiz = findById(id);

        if (!authRequestUtils.isRequestFromCreator(quiz.getCreatedBy())) {
            throw new SecurityException();
        }

        repository.delete(quiz);

        return findAll();
    }

    public List<Quiz> findAll(){
        return repository
                .findAll()
                .stream()
                .filter(q -> authRequestUtils.isRequestFromCreator(q.getCreatedBy()))
                .toList();
    }

    public Quiz findById(String id) {
        Quiz quiz = repository.findById(id).orElseThrow();

        if (!authRequestUtils.isRequestFromCreator(quiz.getCreatedBy())) {
            throw new RuntimeException(); //not found
        }

        return quiz;
    }

    public Optional<Quiz> findByTitle(String title) {
        Optional<Quiz> quiz = repository.findByTitle(title);

        if (quiz.isEmpty() || !authRequestUtils.isRequestFromCreator(quiz.get().getCreatedBy())) {
            throw new RuntimeException(); //not found
        }

        return quiz;
    }
}
