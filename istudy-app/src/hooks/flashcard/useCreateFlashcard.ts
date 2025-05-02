import { useNotification } from "@/hooks/notification";
import { FlashcardRequest } from "@/resources/services/flashcard/flashcard.resource";
import { useFlashcard } from "@/resources/services/flashcard/flashcard.service";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateFlashcard = () => {
    const queryClient = useQueryClient();
    const flashcardService = useFlashcard();
    const notification = useNotification();

    return useMutation({
        mutationFn: (flashcard: FlashcardRequest) => flashcardService.create(flashcard),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["flashcard-data"] });
            notification.notify("Flashcard created successfully!", "success");
        },
        onError: () => {
            notification.notify("An error occurred while trying to create a Flashcard. Please try again.", "error");
        }
    });
};