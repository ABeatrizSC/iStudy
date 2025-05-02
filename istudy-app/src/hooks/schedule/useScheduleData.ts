import { useScheduleItem } from "@/resources/services/schedule-item/schedule.service";
import { useQuery } from "@tanstack/react-query"

export const useScheduleData = () => {
    const scheduleService = useScheduleItem();

    const query = useQuery({
        queryFn: () => scheduleService.getAll(),
        queryKey: ['schedule-data']
    })

    return query;
}