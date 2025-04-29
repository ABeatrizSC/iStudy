export interface Reminder {
    id: string;
    createdBy: string;
    task: string;
    date: string;
    isCompleted: boolean;
  }
  
  export interface ReminderRequest {
    task: string;
    date: string;
    isCompleted: boolean;
  }
  