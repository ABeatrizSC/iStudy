import { useNotification } from "@/hooks/notification";
import { useFlashcard } from "@/resources/services/flashcard/flashcard.service";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteFlashcard= () => {
    const queryClient = useQueryClient();
    const flashcardService = useFlashcard();
    const notification = useNotification();

    return useMutation({
        mutationFn: (id: string) => flashcardService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["flashcard-data"] });
            notification.notify("Flashcard deleted successfully!", "success");
        },
        onError: () => {
            notification.notify("An error occurred while trying to delete the Flashcard. Please try again.", "error");
        }
    });
};