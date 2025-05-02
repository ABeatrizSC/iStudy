import { useNotification } from "@/hooks/notification";
import { ScheduleItemRequest } from "@/resources/services/schedule-item/schedule.resource";
import { useScheduleItem } from "@/resources/services/schedule-item/schedule.service";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateSchedule = () => {
    const queryClient = useQueryClient();
    const scheduleService = useScheduleItem();
    const notification = useNotification();

    return useMutation({
        mutationFn: (schedule: ScheduleItemRequest) => scheduleService.create(schedule),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["schedule-data"] });
            notification.notify("Activity created successfully!", "success");
        },
        onError: () => {
            notification.notify("An error occurred while trying to create an activity. Please try again.", "error");
        }
    });
};