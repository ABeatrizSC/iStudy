import React from "react";
import { CheckCircle, Delete } from "@mui/icons-material";
import { Button } from "../";
import { Reminder } from "@/resources/services/reminder/reminder.resource";
import { useRouter } from "next/navigation";
import theme from "@/resources/assets/styles/Theme";

type ReminderListProps = {
  reminders: Reminder[];
  onComplete: (reminder: Reminder) => void;
  onDelete: (reminderId: string) => void;
};

export const ReminderList: React.FC<ReminderListProps> = ({ reminders, onComplete, onDelete }) => {
  const visibleReminders = reminders?.slice(0, 4).filter((r) => !r.isCompleted);
  const router = useRouter();

  if (!visibleReminders || visibleReminders.length === 0) {
    return <span className="text-center">No reminders registered for today.</span>;
  }

  return (
    <div className="flex flex-col gap-2 h-full">
      {visibleReminders.map((reminder) => (
        <div
          key={reminder.id}
          className="bg-amber-200 rounded-md py-3 px-5 flex justify-between items-center"
        >
          <span>{reminder.task}</span>
          <div className="flex gap-2">
            <Button style="!bg-transparent !p-0" onClick={() => onComplete(reminder)}>
              <CheckCircle sx={{ color: theme.palette.green.main }} />
            </Button>
            <Button style="!bg-transparent !p-0" onClick={() => onDelete(reminder.id)}>
              <Delete sx={{ color: theme.palette.red.main }} />
            </Button>
          </div>
        </div>
      ))}
      <Button onClick={() => router.push("/reminders")} style="self-center mt-auto">
        See all reminders
      </Button>
    </div>
  );
};