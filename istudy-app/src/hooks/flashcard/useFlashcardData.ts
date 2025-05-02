import { useFlashcard } from "@/resources/services/flashcard/flashcard.service";
import { useQuery } from "@tanstack/react-query"

export const useFlashcardData = () => {
    const flashcardService = useFlashcard();

    const query = useQuery({
        queryFn: () => flashcardService.getAll(),
        queryKey: ['flashcard-data']
    })

    return query;
}