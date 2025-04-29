import { useNotification } from "@/hooks/notification";
import { useScheduleItem } from "@/resources/services/schedule-item/schedule.service";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteSchedule= () => {
    const queryClient = useQueryClient();
    const scheduleService = useScheduleItem();
    const notification = useNotification();

    return useMutation({
        mutationFn: (id: string) => scheduleService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["schedule-data"] });
            notification.notify("Activity deleted successfully!", "success");
        },
        onError: () => {
            notification.notify("An error occurred while trying to delete the activity. Please try again.", "error");
        }
    });
};