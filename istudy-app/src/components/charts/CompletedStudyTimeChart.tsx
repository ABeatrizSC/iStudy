'use client'

import { ChartContainer } from "../ui/chart"
import { BarChart, Bar, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from "recharts"
import { StudyTime } from "@/resources/services/study/study.resource"
import { formatCategory, formatTimeToNumber, formatNumberToTimeString } from "@/utils/formatters"
import { CATEGORY_COLOR } from "@/constants/colors/categoriesColors";
import theme from "@/resources/assets/styles/Theme";

interface props {
  studyData: StudyTime[] | undefined;
  isCategory?: boolean;
}

export const CompletedStudyTimeChart: React.FC<props> = ({ studyData, isCategory = false }) => {
  const chartData = studyData?.map((study) => ({
    label: study.name,
    hours: formatTimeToNumber(study.completedTime)
  })) ?? [];

  const maxLabelLength = Math.max(...chartData.map(item => item.label.length));
  const yAxisWidth = Math.min(250, maxLabelLength * 8);

  return (
    <ChartContainer config={{}} className="h-[300px] max-w-full">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={chartData}
                layout="vertical"
                margin={{ right: 55, top: 15, bottom: 15, left: 5 }}
            >
                <CartesianGrid horizontal={false} />
                <YAxis
                    dataKey="label"
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    width={yAxisWidth}
                    tickFormatter={(value) => isCategory ? formatCategory(value) : value}
                />
                <XAxis type="number" />
                <Tooltip 
                    formatter={(value: number) => formatNumberToTimeString(value)}
                />
                <Bar
                    dataKey="hours"
                    radius={[4, 4, 4, 4]}
                >
                    {chartData.map((entry, index) => (
                        <Cell
                        key={`cell-${index}`}
                        fill={
                            isCategory
                            ? CATEGORY_COLOR[formatCategory(entry.label) as keyof typeof CATEGORY_COLOR] ?? theme.palette.primary.main
                            : theme.palette.primary.main
                        }
                        />
                    ))}
                    <LabelList
                        dataKey="hours"
                        position="right"
                        formatter={(value: number) => formatNumberToTimeString(value)}
                    />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </ChartContainer>
  );
}