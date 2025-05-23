import { useNotification } from "@/hooks/notification";
import { QuizRequest } from "@/resources/services/quiz/quiz.resource";
import { useQuiz } from "@/resources/services/quiz/quiz.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateQuiz = () => {
    const queryClient = useQueryClient();
    const quizService = useQuiz();
    const notification = useNotification();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: QuizRequest }) => quizService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["quiz-data"] });
            notification.notify("Quiz updated successfully!", "success");
        },
        onError: () => {
            notification.notify("An error occurred while trying to update the Quiz. Please try again.", "error");
        }
    });
};