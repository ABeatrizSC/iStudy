import React from "react";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { ScheduleItem } from "@/resources/services/schedule-item/schedule.resource";
import { useRouter } from "next/navigation";
import { CustomTable, Button } from "../";
import theme from "@/resources/assets/styles/Theme";
import { formatTime } from "@/utils/formatters";

type ScheduleTableProps = {
  todaySchedule: ScheduleItem[];
};

export const ScheduleTable: React.FC<ScheduleTableProps> = ({ todaySchedule }) => {
  const router = useRouter();

  return (
    <>
      <CustomTable>
        <TableHead>
          <TableRow>
            {["Activity", "Start time", "End time"].map((label, index) => (
              <TableCell
                key={label}
                align="center"
                sx={{
                  backgroundColor: "transparent",
                  borderBottom: "none",
                  padding: 0,
                }}
              >
                <div
                  style={{
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                    padding: "6px 12px",
                    display: "inline-block",
                    whiteSpace: "nowrap",
                    width: "100%",
                    borderTopLeftRadius: index === 0 ? "12px" : 0,
                    borderTopRightRadius: index === 2 ? "12px" : 0,
                  }}
                >
                  {label}
                </div>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {todaySchedule && todaySchedule.length > 0 ? (
            todaySchedule.slice(0, 4).map((item, index) => (
              <TableRow
                key={index}
                className="border-t border-gray-300"
                sx={{
                  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                }}
              >
                <td className="px-4 py-2">{item.title}</td>
                <td className="px-4 py-2">{formatTime(item.startTime)}</td>
                <td className="px-4 py-2">{formatTime(item.endTime)}</td>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <td colSpan={3} className="py-4 text-gray-500 text-center">
                No scheduled activity for today.
              </td>
            </TableRow>
          )}
        </TableBody>
      </CustomTable>

      <Button onClick={() => router.push("/schedules")} style="self-center mt-auto">
        See the full schedule
      </Button>
    </>
  );
};