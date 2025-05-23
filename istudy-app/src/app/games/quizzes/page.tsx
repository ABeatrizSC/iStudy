'use client'

import { useState } from "react";
import {
    Container,
    Template,
    Title,
    Button,
    QuizModal,
    ConfirmationModal,
    FlashcardGameModal,
    StartGameOptionsModal,
    FlashcardBox,
    QuizBox,
    QuizGameModal
} from "@/components";
import { Add } from "@mui/icons-material";
import { Input } from "@mui/material";

import { useCreateQuiz } from "@/hooks/quiz/useCreateQuiz";
import { useQuizData } from "@/hooks/quiz/useQuizData";
import { useUpdateQuiz } from "@/hooks/quiz/useUpdateQuiz";
import { useDeleteQuiz } from "@/hooks/quiz/useDeleteQuiz";
import { Quiz } from "@/resources/services/quiz/quiz.resource";

export default function Quizzes() {
    const [searchByTitle, setSearchByTitle] = useState<string>("");
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
    const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    const [openGameModal, setOpenGameModal] = useState<boolean>(false);
    const [openStartOptionsModal, setOpenStartOptions] = useState<boolean>(false);

    const [quizSelected, setQuizSelected] = useState<Quiz>({
        id: '',
        createdBy: '',
        title: '',
        questions: []
    });

    const { data: allQuizzes, isLoading: isAllQuizzesLoading } = useQuizData();

    const quizzes = searchByTitle
        ? allQuizzes?.filter(q => q.title.toLowerCase().includes(searchByTitle.toLowerCase()))
        : allQuizzes;

    const createQuiz = useCreateQuiz();
    const updateQuiz = useUpdateQuiz();
    const deleteQuiz = useDeleteQuiz();

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
    };

    const handleDeleteQuiz = (id: string) => {
        deleteQuiz.mutate(id, {
            onSuccess: () => handleCloseDeleteModal(),
        });
    };

    const handleRetryIncorrects = () => {
        const incorrectAnswers = quizSelected.questions.filter(q => !q.correctAnswer);

        const updatedQuestions = incorrectAnswers.length > 0
            ? incorrectAnswers
            : quizSelected.questions.map(q => ({ ...q, correctAnswer: false }));

        setQuizSelected(prev => ({ ...prev, questions: updatedQuestions }));
        setOpenStartOptions(false);
        setOpenGameModal(true);
    };

    const handleRestartGame = () => {
        const resetQuestions = quizSelected.questions.map(q => ({ ...q, correctAnswer: false }));
        setQuizSelected(prev => ({ ...prev, questions: resetQuestions }));
        setOpenStartOptions(false);
        setOpenGameModal(true);
    };

    return (
        <Template loading={isAllQuizzesLoading}>
            <Title>
                Quizzes
            </Title>
            <Container>
                <div className="flex flex-wrap flex-row items-center justify-center md:justify-between gap-5">
                    <div className="flex items-center flex-1">
                        <label htmlFor="searchByTitle" className="mr-2 text-nowrap">Search:</label>
                        <Input
                            id="searchByTitle"
                            placeholder="Quiz title"
                            fullWidth={true}
                            value={searchByTitle}
                            onChange={(event) => setSearchByTitle(event.target.value)}
                            sx={{ minWidth: '150px' }}
                        />
                    </div>
                    <Button style="!h-fit !py-2" onClick={() => setOpenCreateModal(true)}>
                        <Add />
                        New
                    </Button>
                </div>
            </Container>
            <Container style={"!grid !grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4"}>
                {quizzes?.length === 0 && (
                    <p className="w-full text-center">No quizzes registered.</p>
                )}
                {quizzes?.map((quiz, index) => (
                    <QuizBox
                        key={index}
                        quizData={quiz}
                        setQuizSelected={() => setQuizSelected(quiz)}
                        openDeleteModal={() => setOpenDeleteModal(true)}
                        openStartOptions={() => setOpenStartOptions(true)}
                        openUpdateModal={() => setOpenUpdateModal(true)}
                    />
                ))}
            </Container>

            <QuizModal 
                modalTitle="Create quiz"
                submitText="Create"
                createAction={createQuiz}
                open={openCreateModal}
                handleClose={() => setOpenCreateModal(false)}
            />
            <QuizModal 
                key={quizSelected.id}
                modalTitle="Update quiz"
                submitText="Update"
                updateAction={updateQuiz}
                data={quizSelected}
                open={openUpdateModal}
                handleClose={() => setOpenUpdateModal(false)}
            />

            <ConfirmationModal
                title={`Delete '${quizSelected.title}'?`}
                description="This action will permanently delete all linked questions."
                action={() => handleDeleteQuiz(quizSelected.id)}
                open={openDeleteModal}
                handleClose={handleCloseDeleteModal}
                agreeText="Delete"
            />
            <StartGameOptionsModal
                open={openStartOptionsModal}
                handleClose={() => setOpenStartOptions(false)}
                restartAction={handleRestartGame}
                retryWrongAnswersAction={handleRetryIncorrects}
            />
            <QuizGameModal 
                open={openGameModal}
                handleClose={() => setOpenGameModal(false)}
                quizData={quizSelected}
            />
        </Template>
    );
}