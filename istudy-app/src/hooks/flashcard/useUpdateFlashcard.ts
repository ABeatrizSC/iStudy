import { useNotification } from "@/hooks/notification";
import { FlashcardRequest } from "@/resources/services/flashcard/flashcard.resource";
import { useFlashcard } from "@/resources/services/flashcard/flashcard.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateFlashcard = () => {
    const queryClient = useQueryClient();
    const FlashcardService = useFlashcard();
    const notification = useNotification();

    return useMutation({
        mutationFn: ({ flashcard, id }: { flashcard: FlashcardRequest; id: string }) => 
            FlashcardService.update(id, flashcard),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["flashcard-data"] });
            notification.notify("Flashcard updated successfully!", "success");
        },
        onError: () => {
            notification.notify("An error occurred while trying to update the Flashcard. Please try again.", "error");
        }
    });
};
