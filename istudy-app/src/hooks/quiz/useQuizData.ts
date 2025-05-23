import { useQuiz } from "@/resources/services/quiz/quiz.service";
import { useQuery } from "@tanstack/react-query"

export const useQuizData = () => {
    const quizService = useQuiz();

    const query = useQuery({
        queryFn: () => quizService.getAll(),
        queryKey: ['quiz-data']
    })

    return query;
}