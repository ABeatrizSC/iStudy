import { useReminder } from "@/resources/services/reminder/reminder.service";
import { useQuery } from "@tanstack/react-query"

export const useReminderData = () => {
    const reminderService = useReminder();

    const query = useQuery({
        queryFn: () => reminderService.getAll(),
        queryKey: ['reminder-data']
    })

    return query;
}