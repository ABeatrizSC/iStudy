'use client';

import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Input, Radio } from '@mui/material';
import { Button } from '../';
import { Add, Cancel } from '@mui/icons-material';
import { UseMutationResult } from '@tanstack/react-query';
import { useNotification } from '@/hooks/notification';
import { QuestionRequest, Quiz, QuizRequest } from '@/resources/services/quiz/quiz.resource';

interface QuizModalProps {
    modalTitle: string;
    submitText: string;
    data?: Quiz;
    createAction?: UseMutationResult<Quiz[], Error, QuizRequest, unknown>;
    updateAction?: UseMutationResult<Quiz[], Error, { id: string; data: QuizRequest }, unknown>;
    open: boolean;
    handleClose: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
    modalTitle,
    submitText,
    data,
    createAction,
    updateAction,
    open,
    handleClose,
}) => {
    const [quizTitle, setQuizTitle] = useState<string>(data?.title ?? '')
    const [questions, setQuestions] = useState<QuestionRequest[]>( data?.questions ?? []);

    const notification = useNotification();

    const handleAddQuestion = () => {
        const newQuestion = {
            id: '',
            question: '',
            options: [
                { id: '', option: '', isCorrect: true },
                { id: '', option: '', isCorrect: false },
                { id: '', option: '', isCorrect: false },
                { id: '', option: '', isCorrect: false },
            ],
        };
        setQuestions((prev) => ([...prev, newQuestion]));
    };

    const handleRemoveQuestion = (indexToRemove: number) => {
        setQuestions((prev) => prev.filter((_, index) => index !== indexToRemove));
    };


    const handleQuestionChange = (index: number, value: string) => {
        setQuestions((prev) => {
            const updated = [...prev];
            updated[index].question = value;
            return updated;
        });
    };

    const handleOptionTextChange = (questionIndex: number, optionIndex: number,     value: string) => {
        setQuestions((prev) => {
            const updated = [...prev];
            updated[questionIndex].options[optionIndex].option = value;
            return updated;
        });
    };

    const handleCorrectOptionChange = (questionIndex: number, correctOptionIndex: number) => {
        setQuestions((prev) => {
            const updated = [...prev];
            updated[questionIndex].options = updated[questionIndex].options.map((opt, i) => ({
                ...opt,
                isCorrect: i === correctOptionIndex
            }));
            return updated;
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (questions.length < 1) {
            return notification.notify('You need to add at least one question', 'error');
        }

        const requestBody = { title: quizTitle, questions: questions }

        if (data?.id) {
            updateAction?.mutate(
                { id: data.id, data: requestBody },
                {
                    onSuccess: () => handleClose(),
                }
            );
        } else {
            createAction?.mutate(requestBody, {
                onSuccess: () => handleClose(),
            });
        }
    };

    useEffect(() => (
        setQuestions(data?.questions ?? []),
        setQuizTitle(data?.title ?? '')
    ), [open])

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            slotProps={{
                paper: {
                    component: 'form',
                    onSubmit: handleSubmit,
                },
            }}
        >
            <DialogTitle textAlign="center" textTransform="uppercase">
                {modalTitle}
            </DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <span className="flex gap-2 items-end ">
                    <label htmlFor="quizTitle" className="text-nowrap mr-2">
                        Quiz title:
                    </label>
                    <Input
                        id="quizTitle"
                        required
                        value={quizTitle}
                        onChange={(e) => setQuizTitle(e.target.value)}
                        fullWidth
                    />

                </span>

                <div className="flex flex-col gap-5 items-center">
                    <div className="w-full flex gap-5 justify-between items-center ">
                        <h3>Questions</h3>
                        <Button onClick={handleAddQuestion}>
                            <Add />
                        </Button>
                    </div>

                    {questions.map((question, index) => (
                        <div
                            key={index}
                            className="w-full p-4 rounded-md relative shadow-[0px_0px_3px_0px_rgba(117,117,117,0.57)]"
                        >
                            <h4 className="text-center text-gray-400">#{index + 1}</h4>

                            <div className="w-full">
                                <span className="flex gap-2 w-full items-end mb-5">
                                    <label htmlFor={`question-${index}`}>Question:</label>
                                    <Input
                                        id={`question-${index}`}
                                        fullWidth
                                        required
                                        value={question.question}
                                        onChange={(e) =>
                                            handleQuestionChange(index, e.target.value)
                                        }
                                    />
                                </span>
                                {question.options.map((option, optIndex) => (
                                    <div key={optIndex} className="flex gap-3 w-full items-center mt-2">
                                        <label className='text-nowrap' htmlFor={`option-${index}-${optIndex}`}>
                                            Option {optIndex + 1}:
                                        </label>
                                        <Input
                                            id={`option-${index}-${optIndex}`}
                                            fullWidth
                                            required
                                            value={option.option}
                                            onChange={(e) =>
                                                handleOptionTextChange(index, optIndex, e.target.value)
                                            }
                                        />
                                        <div className='flex items-center'>
                                            <Radio
                                                name={`correctOption-${index}`}
                                                checked={option.isCorrect}
                                                onChange={() => handleCorrectOptionChange(index, optIndex)}
                                            />
                                            <label>Correct</label>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Button
                                style="absolute top-3 right-3 !bg-transparent !text-red-500 !px-0 !py-0 h-fit"
                                onClick={() => handleRemoveQuestion(index)}
                            >
                                <Cancel fontSize="small" />
                            </Button>
                        </div>
                    ))}
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} style="!bg-transparent !text-red-500">
                    Cancel
                </Button>
                <Button type="submit">{submitText}</Button>
            </DialogActions>
        </Dialog>
    );
};
