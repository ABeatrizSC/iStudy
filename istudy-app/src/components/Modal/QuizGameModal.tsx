'use client';

import { Dialog, AppBar, Toolbar, DialogContent, Radio, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { Button, Title } from '..';
import { Question, QuestionAnswer, Quiz } from '@/resources/services/quiz/quiz.resource';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import theme from '@/resources/assets/styles/Theme';
import { useAnswerQuiz } from '@/hooks/quiz/useAnswerQuiz';

interface QuizGameModalProps {
  quizData: Quiz;
  open: boolean;
  handleClose: () => void;
}

export const QuizGameModal: React.FC<QuizGameModalProps> = ({
  quizData,
  open,
  handleClose
}) => {
    const [showResult, setShowResult] = useState(false);
    const [questions, setQuestions] = useState<Question[]>([]);

    const answerQuiz = useAnswerQuiz();

    function shuffleArray<T>(array: T[]): T[] {
        return [...array].sort(() => Math.random() - 0.5);
    }

    const handleOptionChange = (questionId: string, optionId: string) => {
        setQuestions((prev) =>
            prev.map((q) =>
            q.id === questionId
                ? {
                    ...q,
                    optionChosen: optionId,
                    correctAnswer: q.options.find((o) => o.id === optionId)?.isCorrect ?? false
                }
                : q
            )
        );
    };

    const handleCloseAndSaveQuiz = () => {
        const quizAnswered: QuestionAnswer[] = questions.map((q) => ({
            id: q.id,
            optionChosen: q.optionChosen
        }));

        if (quizAnswered.filter(q => q.optionChosen != '').length != questions.length) {
            handleClose();
            return
        }

        answerQuiz.mutate({ id: quizData.id, data: { questions: quizAnswered } },
            {
                onSuccess: () => {
                    handleClose();
                }
            }
        );
    };

    const handleRestartQuiz = () => {
        const resetQuestions = shuffleArray(quizData.questions).map((q) => ({
            ...q,
            correctAnswer: false,
            optionChosen: '',
            options: shuffleArray(q.options)
        }));
        setQuestions(resetQuestions);
        setShowResult(false);
    };

    const handleRetryIncorrects = () => {
        var incorrectAnswers: Question[] = questions.filter(q => !q.correctAnswer);
        incorrectAnswers = incorrectAnswers.map(q => ({
            ...q,
            optionChosen: ''
        }))
        setQuestions(incorrectAnswers);
        setShowResult(false);
    }

    const totalCorrect = questions.filter(q => q.correctAnswer).length;
    const totalQuestions = questions.length;

        useEffect(() => {
        if (open && quizData?.questions) {
            const shuffledQuestions = shuffleArray(quizData.questions).map((q) => ({
                ...q,
                correctAnswer: false,
                optionChosen: '',
                options: shuffleArray(q.options)
            }));
            setQuestions(shuffledQuestions);
            setShowResult(false);
        }
    }, [open, quizData]);

    return (
        <Dialog fullScreen open={open} onClose={handleCloseAndSaveQuiz}>
            <AppBar
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0
                }}
            >
                <Toolbar>
                    <Button onClick={handleCloseAndSaveQuiz}>
                        <CloseIcon fontSize="large" />
                    </Button>
                </Toolbar>
            </AppBar>

            <DialogContent
                sx={{
                    paddingTop: '84px',
                    paddingBottom: 4,
                    display: 'flex',
                    justifyContent: 'center',
                    overflowY: 'auto',
                }}
            >
            <div className="w-full max-w-[700px] px-4 flex flex-col items-center">
                <Title>
                    Quiz: {quizData.title}
                </Title>

                {!showResult ? (
                    <div className="w-[300px] md:w-[700px] flex flex-col space-y-6 pb-5">
                        {questions.map((q, i) => (
                            <div
                                key={q.id}
                                className="w-full p-4"
                            >
                                <h3 className="mb-3 text-base sm:text-lg leading-snug">
                                    <span className="font-bold">
                                        {i + 1}.
                                    </span> 
                                    {q.question}
                                </h3>
                                <div className="space-y-2">
                                    {q.options.map((o) => (
                                        <div key={o.id} className="flex items-center gap-2 flex-wrap">
                                            <Radio
                                                name={`question-${q.id}`}
                                                checked={q.optionChosen === o.id}
                                                onChange={() => handleOptionChange(q.id, o.id)}
                                            />
                                            <label className="text-sm sm:text-base">
                                                {o.option}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    
                        <Button onClick={() => setShowResult(true)}>
                            See result
                        </Button>
                    </div>
                ) : (
                <div className="flex flex-col items-center my-auto">
                    <div className="w-[300px] h-[200px] my-5">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={[
                                        { name: 'Correct answers', value: totalCorrect },
                                        { name: 'Wrong answers', value: totalQuestions - totalCorrect },
                                    ]}
                                    dataKey="value"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}    
                                    outerRadius={100}
                                    paddingAngle={5}
                                    cornerRadius={4}
                                    fill={theme.palette.primary.main}
                                >
                                    <Cell fill={theme.palette.green.main} /> 
                                    <Cell fill={theme.palette.red.main} />
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <Typography variant="h5" className="mt-4">
                        {totalCorrect} / {totalQuestions} corrects
                    </Typography>
                    <div className="flex gap-5 mt-8">
                        <Button color='red' onClick={handleRetryIncorrects}>
                            Retry incorrect answers
                        </Button>
                        <Button onClick={handleRestartQuiz}>
                            Restart Quiz
                        </Button>
                    </div>
                </div>
                )}
            </div>
            </DialogContent>
        </Dialog>
    );
};