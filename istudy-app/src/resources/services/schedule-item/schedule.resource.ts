export interface ScheduleItem {
    id: string;
    createdBy: string;
    title: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
}  

export interface ScheduleItemRequest {
    title: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
  }  