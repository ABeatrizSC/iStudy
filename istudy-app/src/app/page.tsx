'use client'

import { useState } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { Container, Template, Title, PercentageStudyTimeChart } from "@/components";
import { useReminderByDate } from "@/hooks/reminder/useReminderByDate";
import { useUpdateReminder } from "@/hooks/reminder/useUpdateReminder";
import { useDeleteReminder } from "@/hooks/reminder/useDeleteReminder";
import { useScheduleData } from "@/hooks/schedule/useScheduleData";
import { useStudyInfo } from "@/hooks/study";
import { useSubjectData } from "@/hooks/subject";
import { useDailyStudyStatus } from "@/hooks/study/useDailyStudyStatus";
import { formatSavedDate, formatTimeToNumber, formatTime } from "@/utils/formatters";
import { getUsernameFromToken } from "@/resources/services/auth-user/authentication.service";
import theme from "@/resources/assets/styles/Theme";
import { ReminderRequest } from "@/resources/services/reminder/reminder.resource";
import { Subtitle } from "@/components/Home/Subtitle";
import { ReminderList, ScheduleTable, StudyStatusBox, SubjectInfoList } from "@/components/Home";

export default function Home() {
  const today = dayjs();
  const todayFormatted = formatSavedDate(today);
  
  const fifteenDaysAgo = today.subtract(14, "day");
  const startDate = fifteenDaysAgo.format("YYYY-MM-DD");
  const endDate = today.format("YYYY-MM-DD");

  const currentMonth = today.month() + 1;
  const currentYear = today.year();
  const todayWeekDay = today.isoWeekday(); 

  const [date, setDate] = useState<string>(todayFormatted);

  const { data: remindersByDate, isLoading: isRemindersByDateLoading } = useReminderByDate(date);
  const { data: allSchedulesItems } = useScheduleData();
  const { data: studyInfo, isLoading: isStudyInfoLoading } = useStudyInfo({ time: currentMonth, year: currentYear, includeWeek: false });
  const { data: dailyStudyInfo, isLoading: dailyStudyInfoLoading } = useStudyInfo({ time: todayFormatted, year: currentYear, includeWeek: false });
  const { data: subjects, isLoading: isSubjectsLoading } = useSubjectData();
  const { data: studiesStatus, isLoading: isStudiesStatusLoading} = useDailyStudyStatus(startDate, endDate)

  const studiesCompletedQtt = studyInfo?.totalCompletedStudies || 0;
  const totalStudiesQtt = studyInfo?.totalStudies || 0;
  const studiesIncompletedQtt = totalStudiesQtt - studiesCompletedQtt;

  const studiesCompletedPercentage = (studiesCompletedQtt/totalStudiesQtt)*100;

  const router = useRouter();
  const updateReminder = useUpdateReminder();
  const deleteReminder = useDeleteReminder();

  const isLoading = isRemindersByDateLoading || isStudyInfoLoading || isSubjectsLoading || dailyStudyInfoLoading || isStudiesStatusLoading;

  const getProgressValue = (value: number, totalValue: number) => {
    return (value * 100) / totalValue
  }

  const handleReminderCompleted = (reminder: any) => {
    const updatedReminder: ReminderRequest = {
      task: reminder.task,
      date: reminder.date,
      isCompleted: true
    };

    updateReminder.mutate({ reminder: updatedReminder, id: reminder.id });
  };

  const handleDeleteReminder = (id: string) => {
    deleteReminder.mutate(id);
  };

  const todaySchedule = allSchedulesItems
    ?.filter((item) => item.dayOfWeek === todayWeekDay)
    ?.sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <Template loading={isLoading}>
      <Title>
        Hello, {getUsernameFromToken()?.name}!
      </Title>
      <div className="flex flex-wrap gap-3">
        <Container style="w-full sm:min-w-[200px] w-full md:w-[calc(50%-0.375rem)]">
          <Subtitle>
            Current month's study time
          </Subtitle>
          <span
            style={{ color: theme.palette.gray.main }}
            className="bold text-2xl sm:text-3xl lg:text-4xl self-end mt-auto block"
          >
            {formatTime(studyInfo?.completedStudyTime)}
          </span>
        </Container>

        <Container style="w-full sm:min-w-[200px] w-full md:w-[calc(50%-0.375rem)]">
          <Subtitle>
            % of studies completed this month
          </Subtitle>
          <div className="flex flex-wrap justify-between gap-2">
            <div className="min-w-fit">
              <span style={{ color: theme.palette.green.main, display: "block" }}>
                {studiesCompletedQtt} completed
              </span>
              <span style={{ color: theme.palette.red.main, display: "block" }}>
                {studiesIncompletedQtt} incompleted
              </span>
            </div>
            <span
              style={{ color: theme.palette.gray.main }}
              className="bold text-2xl sm:text-3xl lg:text-4xl mt-auto"
            >
              {studiesCompletedPercentage.toFixed(2)}%
            </span>
          </div>
        </Container>
      </div>


      <Container>
        <Subtitle>
          Study Status from the Last 15 Days
        </Subtitle>

        <div className='flex flex-wrap gap-3 justify-center lg:justify-between'>
          {studiesStatus?.map((status, index) => {
            return (
              <StudyStatusBox 
                key={index} 
                status={status}
              />
            );
          })}
        </div>
      </Container>

      <div className="flex flex-wrap justify-center gap-3">
        <Container style="w-full sm:min-w-[400px] flex-1 h-[350px] overflow-y-auto">
          <Subtitle>
            Daily schedule
          </Subtitle>
          <ScheduleTable todaySchedule={todaySchedule ?? []} />
        </Container>

        <Container style="min-w-[300px] flex-1 h-[350px]">
          <Subtitle>
            Daily Reminders
          </Subtitle>
          <ReminderList
            reminders={remindersByDate ?? []}
            onComplete={handleReminderCompleted}
            onDelete={handleDeleteReminder}
          />
        </Container>
      </div>

      <div className="flex flex-wrap justify-center gap-3 pb-5 max-h-fit">
        <Container style="min-w-[350px] flex-1">
          <Subtitle>
            Subjects
          </Subtitle>
          <SubjectInfoList subjects={subjects ?? []} />
        </Container>

        <Container style="min-w-[300px] flex-1 text-center h-[350px]">
          <Subtitle>
            Daily study time
          </Subtitle>
          <PercentageStudyTimeChart 
            totalHours={formatTimeToNumber(dailyStudyInfo?.totalStudyTime)} 
            completedHours={formatTimeToNumber(dailyStudyInfo?.completedStudyTime)} 
          />
        </Container>
      </div>
    </Template>
  );
}