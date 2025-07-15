'use client';

import { useState } from "react";
import { TimeType } from "@/app/types";
import { ChartsHeader, ConfirmationModal, Container, DateInput, MonthlyStudyTimeCard, PercentageStudyTimeChart, StudyCompletionStatsCard, StudyStatusCard, Template, Title, WeeklyStudyChart } from "@/components";
import { useStudyInfo } from "@/hooks/study";
import { formatDate, formatSavedDate, formatTimeToNumber } from "@/utils/formatters";
import {  MenuItem, Select, SelectChangeEvent } from "@mui/material";
import dynamic from "next/dynamic"

const CompletedStudyTimeChart = dynamic(
  () => import('@/components/Charts/CompletedStudyTimeChart').then(mod => mod.CompletedStudyTimeChart),
  { ssr: false }
);

export default function StudyStatisticalInformation() {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const [dateFilter, setDateFilter] = useState<string>("");
  const [monthFilter, setMonthFilter] = useState<number>(currentMonth);
  const [timeFilter, setTimeFilter] = useState<TimeType>({ time: monthFilter, year: currentYear, includeWeek: false });

  const [openConfirmModal, setOpenConfirmModal]= useState<boolean>(false);

  const { data: studyInfo, isLoading: isStudyInfoLoading } = useStudyInfo(timeFilter);

  const getYear = (date: string) => {
    return new Date(date).getFullYear();
  }
  
  const handleTimeFilter = (time: number | string, year: number, include: boolean) => {
    setTimeFilter({ time: time, year, includeWeek: include })
  }
  
  const handleMonthFilter = (event: SelectChangeEvent) => {
    const newMonth = Number(event.target.value);
    setMonthFilter(newMonth);
    setDateFilter("");
    handleTimeFilter(newMonth, 2025, false);
  }
  
  const handleDateFilter = () => {
    setOpenConfirmModal(false);
    setMonthFilter(0);
    handleTimeFilter(dateFilter, getYear(dateFilter), false);
  }
  
  const handleIncludeWeek = () => {
    setMonthFilter(0);
    handleTimeFilter(dateFilter, getYear(dateFilter), true);
    setOpenConfirmModal(false);
  }

  return (
    <Template loading={isStudyInfoLoading}>
      <Title>
        Studies/Statistical Information
      </Title>
      <div className="flex flex-col items-center gap-5">
        <Container style="w-fit flex-wrap !flex-row gap-5 items-center justify-center">
          <span className="text-lg font-semibold text-zinc-700 tex-nowrap">FILTER BY:</span>
          <span className="flex items-center">
            <label className="mr-2">Date:</label>
            <DateInput 
                value={dateFilter}
                onChangeFunc={(newValue) => {
                  setDateFilter(formatSavedDate(newValue))
                  setOpenConfirmModal(true)
                }}
            />
          </span>
          <span>
            <label className="mr-2">Month:</label>
            <Select
                value={monthFilter.toString()}
                onChange={handleMonthFilter}
                sx={{
                    width: '140px'
                }}
            >
              <MenuItem key={1} value={1}>January</MenuItem>
              <MenuItem key={2} value={2}>February</MenuItem>
              <MenuItem key={3} value={3}>March</MenuItem>
              <MenuItem key={4} value={4}>April</MenuItem>
              <MenuItem key={5} value={5}>May</MenuItem>
              <MenuItem key={6} value={6}>June</MenuItem>
              <MenuItem key={7} value={7}>July</MenuItem>
              <MenuItem key={8} value={8}>August</MenuItem>
              <MenuItem key={9} value={9}>September</MenuItem>
              <MenuItem key={10} value={10}>October</MenuItem>
              <MenuItem key={11} value={11}>November</MenuItem>
              <MenuItem key={12} value={12}>December</MenuItem>
            </Select>
          </span>
        </Container>
        <div className="flex flex-wrap gap-3 w-full">
          <MonthlyStudyTimeCard title="Total study time" data={studyInfo}/>
  
          <StudyCompletionStatsCard title="% of studies completed" data={studyInfo} />
        </div>

        <StudyStatusCard />

        <div className="w-full flex flex-wrap gap-5">
          <Container style="h-fit flex-1 w-full lg:w-[calc(50%-10px)]">
            <ChartsHeader title="Subjects x completed study hours" />
            <CompletedStudyTimeChart 
              studyData={studyInfo?.completedStudyTimeByDiscipline} 
            />
          </Container>
          <Container style="h-fit flex-1 w-full lg:w-[calc(50%-10px)]">
            <ChartsHeader title="Category x completed study hours" />
            <CompletedStudyTimeChart 
              studyData={studyInfo?.completedStudyTimeByDisciplineCategory} 
              isCategory={true} 
            />
          </Container>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-5">
          <Container style="lg:w-[450px] w-full">
            <ChartsHeader title="Completed study hours x Remaining" />
            <PercentageStudyTimeChart 
              totalHours={formatTimeToNumber(studyInfo?.totalStudyTime)} 
              completedHours={formatTimeToNumber(studyInfo?.completedStudyTime)} 
            />
          </Container>
          <WeeklyStudyChart />
        </div>
      </div>

      <ConfirmationModal 
        title="Consider the entire week of the date?"
        description={`All studies related to the week containing the day ${formatDate(dateFilter)} will be considered. If not, only the day itself will be considered.`}
        action={handleIncludeWeek}
        open={openConfirmModal}
        handleClose={() => handleDateFilter()}
        agreeText="Consider"
      />
    </Template>
  )
}