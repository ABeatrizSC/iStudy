import { useNotification } from "@/hooks/notification";
import { ReminderRequest } from "@/resources/services/reminder/reminder.resource";
import { useReminder } from "@/resources/services/reminder/reminder.service";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateReminder = () => {
    const queryClient = useQueryClient();
    const reminderService = useReminder();
    const notification = useNotification();

    return useMutation({
        mutationFn: (reminder: ReminderRequest) => reminderService.create(reminder),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reminder-data"] });
            notification.notify("Reminder created successfully!", "success");
        },
        onError: () => {
            notification.notify("An error occurred while trying to create a reminder. Please try again.", "error");
        }
    });
};