import React from "react";
import dayjs from "dayjs";
import { CheckCircleOutline, Close, DoNotDisturb } from "@mui/icons-material";
import { DailyStudyStatus } from "@/resources/services/study/study.resource";
import theme from "@/resources/assets/styles/Theme";

type StudyStatusBoxProps = {
  status: DailyStudyStatus;
};

export const StudyStatusBox: React.FC<StudyStatusBoxProps> = ({ status }) => {
  const bgColorClass = !status.dayStudied
    ? "bg-gray-300"
    : status.metGoal
    ? "bg-green-300"
    : "bg-red-300";

  const titleText = !status.dayStudied
    ? "Day not studied"
    : status.metGoal
    ? "Completed studies"
    : "Incompleted studies";

  return (
    <div className="flex flex-col items-center gap-0.5" key={status.date}>
      <p className="text-sm">{dayjs(status.date).format("MM/DD")}</p>
      <span className={`p-2 rounded-md ${bgColorClass}`} title={titleText}>
        {status.dayStudied ? (
          status.metGoal ? (
            <CheckCircleOutline sx={{ fill: theme.palette.green.main }} />
          ) : (
            <Close sx={{ fill: theme.palette.red.main }} />
          )
        ) : (
          <DoNotDisturb sx={{ fill: theme.palette.gray.main }} />
        )}
      </span>
    </div>
  );
};
