'use client'

import { Pie, PieChart, Tooltip, Cell, LabelList, ResponsiveContainer } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import { CustomPieTooltip } from '..';
import theme from '@/resources/assets/styles/Theme';

type Props = {
  totalHours: number;
  completedHours: number;
};

export const PercentageStudyTimeChart: React.FC<Props> = ({ totalHours, completedHours }) => {
  const remainingHours = Math.max(totalHours - completedHours, 0);

  const chartData = [
    {
      label: 'Completed',
      value: completedHours,
      fill: theme.palette.green.main
    },
    {
      label: 'Remaining',
      value: remainingHours,
      fill: theme.palette.red.main
    }
  ];

  const dataWithPercentage = chartData.map((entry) => {
    const percent = totalHours > 0 ? ((entry.value / totalHours) * 100) : 0;
    return {
      ...entry,
      percentage: `${Math.round(percent)}%`
    };
  });

  return (
    <ChartContainer config={{}} className="w-full">
      <div className='w-full h-[250px] flex flex-col items-center'>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomPieTooltip />} />
            <Pie
              data={dataWithPercentage}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
            >
              {dataWithPercentage.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
              <LabelList
                dataKey="percentage"
                position="outside"
                stroke="none"
                fill="#000"
                fontSize={14}
              />
            </Pie>
          </PieChart>
        </ ResponsiveContainer>
        <div className="mt-4 flex justify-center gap-6">
          {dataWithPercentage.map((entry) => (
            <div key={entry.label} className="flex items-center gap-2">
              <span
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: entry.fill }}
              />
              <span className="text-sm">{entry.label}</span>
            </div>
          ))}
        </div>
      </div>
    </ChartContainer>
  );
};
