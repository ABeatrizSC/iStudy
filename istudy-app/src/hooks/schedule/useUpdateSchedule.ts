import { useNotification } from "@/hooks/notification";
import { ScheduleItemRequest } from "@/resources/services/schedule-item/schedule.resource";
import { useScheduleItem } from "@/resources/services/schedule-item/schedule.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateSchedule = () => {
    const queryClient = useQueryClient();
    const scheduleService = useScheduleItem();
    const notification = useNotification();

    return useMutation({
        mutationFn: ({ schedule, id }: { schedule: ScheduleItemRequest; id: string }) => 
            scheduleService.update(schedule, id),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["schedule-data"] });
            notification.notify("Activity updated successfully!", "success");
        },
        onError: () => {
            notification.notify("An error occurred while trying to update the activity. Please try again.", "error");
        }
    });
};
