import React from "react";
import { LinearProgress } from "@mui/material";
import { AccessTimeFilled } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import { Subject } from "@/resources/services/subject/subject.resource";
import { formatTime, formatTimeToNumber } from "@/utils/formatters";
import { Button } from "../Button";
import { useRouter } from "next/navigation";

type SubjectInfoListProps = {
  subjects: Subject[];
};

export const SubjectInfoList: React.FC<SubjectInfoListProps> = ({ subjects }) => {
  const theme = useTheme();
  const router = useRouter();

  const getProgressValue = (value: number, totalValue: number) => {
    return (value * 100) / totalValue
  }

  if (!subjects || subjects.length === 0) {
    return <span>No subjects registered.</span>;
  }

  return (
    <div className="w-full">
      {subjects.slice(0, 4).map((subject, index) => (
        <div key={index} className="bg-gray-200 py-3 px-5 rounded-md w-full mb-3">
          <div className="flex flex-wrap justify-between items-center gap-3 mb-1">
            <p>{subject.name}</p>
            <p>
              <AccessTimeFilled sx={{ fill: theme.palette.primary.main, marginRight: "5px" }} />
              {formatTime(subject.totalTime)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <LinearProgress
              variant="determinate"
              value={getProgressValue(
                formatTimeToNumber(subject.timeCompleted),
                formatTimeToNumber(subject.totalTime)
              )}
              sx={{
                height: "5px",
                borderRadius: "20px",
                width: "100%",
                minWidth: "100px",
              }}
            />
            <span className="text-nowrap">% topics completed</span>
          </div>
        </div>
      ))}
      <Button onClick={() => router.push("/subjects")} style="self-center mt-5 mx-auto">
        See all subjects
      </Button>
    </div>
  );
};