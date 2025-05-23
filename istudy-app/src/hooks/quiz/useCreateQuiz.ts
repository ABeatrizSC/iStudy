import { useNotification } from "@/hooks/notification";
import { QuizRequest } from "@/resources/services/quiz/quiz.resource";
import { useQuiz } from "@/resources/services/quiz/quiz.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateQuiz = () => {
    const queryClient = useQueryClient();
    const quizService = useQuiz();
    const notification = useNotification();

    return useMutation({
        mutationFn: (quiz: QuizRequest) => quizService.create(quiz),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["quiz-data"] });
            notification.notify("Quiz created successfully!", "success");
        },
        onError: () => {
            notification.notify("An error occurred while trying to create a Quiz. Please try again.", "error");
        }
    });
};