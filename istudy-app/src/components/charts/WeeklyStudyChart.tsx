"use client"

import { useState, useEffect } from "react"
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import dayjs from "dayjs"
import weekday from "dayjs/plugin/weekday"
import isoWeek from "dayjs/plugin/isoWeek"
import { useStudyByWeek } from "@/hooks/study"
import theme from "@/resources/assets/styles/Theme"
import { formatDate, formatNumberToTimeString } from "@/utils/formatters"
import { Container, ChartsHeader } from "../index"

dayjs.extend(weekday)
dayjs.extend(isoWeek)

type ChartDataItem = {
  day: string
  hours: number
}

export function WeeklyStudyChart() {
  const currentYear = dayjs().year()
  const currentWeek = dayjs().isoWeek()

  const { data, isLoading, error } = useStudyByWeek(currentYear, currentWeek)
  const [chartData, setChartData] = useState<ChartDataItem[]>([])

  const startOfWeek = dayjs().isoWeek(currentWeek).startOf('isoWeek').format("YYYY-MM-DD")
  const endOfWeek = dayjs().isoWeek(currentWeek).endOf('isoWeek').format("YYYY-MM-DD")

  useEffect(() => {
    if (data) {
      const grouped: Record<string, number> = {}

      for (const record of data) {
        const day = dayjs(record.date).format("ddd")
        const [h, m, s] = record.time.split(":").map(Number)
        const totalHours = h + m / 60 + s / 3600

        grouped[day] = (grouped[day] || 0) + totalHours
      }

      const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      const result: ChartDataItem[] = weekDays.map((day) => ({
        day,
        hours: Number(grouped[day]?.toFixed(2)) || 0,
      }))

      setChartData(result)
    }
  }, [data])

  if (isLoading) return <div className="text-muted-foreground">Loading...</div>
  if (error) return <div className="text-red-500">Error loading data.</div>

  return (
    <Container style="w-full items-center">
      <ChartsHeader title="Weekly Completed Study Time Overview" description={`From ${formatDate(startOfWeek)} to ${formatDate(endOfWeek)}`} />
      <Card className="w-full">
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart 
              data={chartData}
              margin={{ top: 35, right: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis unit="h" />
              <Tooltip 
                formatter={(value: number) => formatNumberToTimeString(value)}
              />
              <Line type="monotone" dataKey="hours" stroke={theme.palette.primary.main} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Container>
  )
}