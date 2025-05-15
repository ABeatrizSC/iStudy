import { useNotification } from "@/hooks/notification";
import { QuizAnswer } from "@/resources/services/quiz/quiz.resource";
import { useQuiz } from "@/resources/services/quiz/quiz.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAnswerQuiz = () => {
    const queryClient = useQueryClient();
    const quizService = useQuiz();
    const notification = useNotification();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: QuizAnswer }) => quizService.answerQuiz(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["quiz-data"] });
            notification.notify("Quiz answered successfully!", "success");
        },
        onError: () => {
            notification.notify("An error occurred while answering the Quiz. Please try again.", "error");
        }
    });
};