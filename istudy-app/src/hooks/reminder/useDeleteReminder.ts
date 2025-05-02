import { useNotification } from "@/hooks/notification";
import { useReminder } from "@/resources/services/reminder/reminder.service";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteReminder= () => {
    const queryClient = useQueryClient();
    const reminderService = useReminder();
    const notification = useNotification();

    return useMutation({
        mutationFn: (id: string) => reminderService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reminder-data"] });
            notification.notify("Reminder deleted successfully!", "success");
        },
        onError: () => {
            notification.notify("An error occurred while trying to delete the reminder. Please try again.", "error");
        }
    });
};