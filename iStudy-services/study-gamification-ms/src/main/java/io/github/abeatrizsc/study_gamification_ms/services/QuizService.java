package io.github.abeatrizsc.study_gamification_ms.services;

import io.github.abeatrizsc.study_gamification_ms.domain.Option;
import io.github.abeatrizsc.study_gamification_ms.domain.Question;
import io.github.abeatrizsc.study_gamification_ms.domain.Quiz;
import io.github.abeatrizsc.study_gamification_ms.dto.QuizRequestDto;
import io.github.abeatrizsc.study_gamification_ms.repositories.OptionRepository;
import io.github.abeatrizsc.study_gamification_ms.repositories.QuizRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class QuizService {
    private QuizRepository repository;

    @Transactional
    public List<Quiz> create(QuizRequestDto requestDto) {
        Quiz quiz = new Quiz();
        quiz.setTitle(requestDto.getTitle());

        List<Question> questions = requestDto.getQuestions().stream().map(qDto -> {
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
            return question;
        }).collect(Collectors.toList());

        quiz.setQuestions(questions);
        repository.save(quiz);

        return findAll();
    }

    @Transactional
    public List<Quiz> update(String id, QuizRequestDto requestDto) {
        Quiz quiz = findById(id);
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
        repository.delete(quiz);
        return findAll();
    }

    public List<Quiz> findAll(){
        return repository.findAll();
    }

    public Quiz findById(String id) {
        return repository.findById(id).orElseThrow();
    }

    public Quiz findByTitle(String title) {
        return repository.findByTitle(title).orElseThrow();
    }
}
