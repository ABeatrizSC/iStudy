import { useNotification } from "@/hooks/notification";
import { ReminderRequest } from "@/resources/services/reminder/reminder.resource";
import { useReminder } from "@/resources/services/reminder/reminder.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateReminder = () => {
    const queryClient = useQueryClient();
    const ReminderService = useReminder();
    const notification = useNotification();

    return useMutation({
        mutationFn: ({ reminder, id }: { reminder: ReminderRequest; id: string }) => 
            ReminderService.update(reminder, id),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reminder-data"] });
            notification.notify("Reminder updated successfully!", "success");
        },
        onError: () => {
            notification.notify("An error occurred while trying to update the reminder. Please try again.", "error");
        }
    });
};
