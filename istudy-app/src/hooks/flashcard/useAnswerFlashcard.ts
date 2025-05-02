import { useNotification } from "@/hooks/notification";
import { FlashcardAnswer, FlashcardRequest } from "@/resources/services/flashcard/flashcard.resource";
import { useFlashcard } from "@/resources/services/flashcard/flashcard.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAnswerFlashcard = () => {
    const queryClient = useQueryClient();
    const flashcardService = useFlashcard();
    const notification = useNotification();

    return useMutation({
        mutationFn: ({ flashcardId, flashcard }: { flashcardId: string; flashcard: FlashcardAnswer }) => 
            flashcardService.answerFlashcard(flashcardId, flashcard),

        onSuccess: (cardsResult) => {
            queryClient.invalidateQueries({ queryKey: ["flashcard-data"] });
            return cardsResult
        },
        onError: () => {
            notification.notify("An error occurred while trying to answer the Flashcard. Please try again.", "error");
        }
    });
};
