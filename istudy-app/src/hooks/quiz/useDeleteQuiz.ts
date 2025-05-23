import { useNotification } from "@/hooks/notification";
import { useQuiz } from "@/resources/services/quiz/quiz.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteQuiz = () => {
    const queryClient = useQueryClient();
    const quizService = useQuiz();
    const notification = useNotification();

    return useMutation({
        mutationFn: (id: string) => quizService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["quiz-data"] });
            notification.notify("Quiz deleted successfully!", "success");
        },
        onError: () => {
            notification.notify("An error occurred while trying to delete the Quiz. Please try again.", "error");
        }
    });
};