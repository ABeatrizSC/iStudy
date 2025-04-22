import { formatTime } from "@/utils/formatters";
import { formatNumberToTimeString } from "@/utils/formatters/formatNumberToTimeString";
import { TooltipProps } from "recharts";

export const CustomPieTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    const label = data.name;
    const value = data.value as number;

    return (
      <div className="bg-white shadow-md rounded px-3 py-2 border border-gray-200 text-sm">
        <p className="font-semibold">{label}</p>
        <p>{formatNumberToTimeString(value)}</p>
      </div>
    );
  }

  return null;
};