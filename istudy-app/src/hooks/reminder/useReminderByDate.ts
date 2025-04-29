import { useReminder } from "@/resources/services/reminder/reminder.service";
import { useQuery } from "@tanstack/react-query"

export const useReminderByDate= (date: string) => {
    const reminderService = useReminder();

    const query = useQuery({
        queryKey: ['reminder-data', date],
        queryFn: () => reminderService.getAllByDate(date),
        enabled: !!date,
    })

    return query;
}