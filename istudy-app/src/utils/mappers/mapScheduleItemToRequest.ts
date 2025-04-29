import { ScheduleItem, ScheduleItemRequest } from "@/resources/services/schedule-item/schedule.resource";

export const mapScheduleItemToRequest = (item?: ScheduleItem): ScheduleItemRequest => ({
    title: item?.title ?? "",
    dayOfWeek: item?.dayOfWeek ?? 0,
    startTime: item?.startTime ?? "00:00",
    endTime: item?.endTime ?? "00:00"
  });
  