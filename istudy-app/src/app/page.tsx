'use client'

import { useState } from "react";
import dayjs from "dayjs";
import { Container, Template, Title, PercentageStudyTimeChart, UserAccountSettingsModal, Button, MonthlyStudyTimeCard, StudyCompletionStatsCard, StudyStatusCard } from "@/components";
import { useReminderByDate } from "@/hooks/reminder/useReminderByDate";
import { useUpdateReminder } from "@/hooks/reminder/useUpdateReminder";
import { useDeleteReminder } from "@/hooks/reminder/useDeleteReminder";
import { useScheduleData } from "@/hooks/schedule/useScheduleData";
import { useStudyInfo } from "@/hooks/study";
import { useSubjectData } from "@/hooks/subject";
import { formatSavedDate, formatTimeToNumber, formatTime } from "@/utils/formatters";
import theme from "@/resources/assets/styles/Theme";
import { ReminderRequest } from "@/resources/services/reminder/reminder.resource";
import { ReminderList, ScheduleTable, SubjectInfoList, Subtitle } from "@/components/Home";
import SettingsIcon from '@mui/icons-material/Settings';
import { useAccountData } from "@/hooks/auth-user/useAccountData";

export default function Home() {
  const today = dayjs();
  const todayFormatted = formatSavedDate(today);

  const currentMonth = today.month() + 1;
  const currentYear = today.year();
  const weekDay = today.day(); 

  const [date, setDate] = useState<string>(todayFormatted);

  const [openAccountSettingsModal, setOpenAccountSettingsModal] = useState<boolean>(false);

  const { data: remindersByDate, isLoading: isRemindersByDateLoading } = useReminderByDate(date);
  const { data: allSchedulesItems, isLoading: isAllScheduleItemsLoading } = useScheduleData();
  const { data: studyInfo, isLoading: isStudyInfoLoading } = useStudyInfo({ time: currentMonth, year: currentYear, includeWeek: false });
  const { data: dailyStudyInfo, isLoading: dailyStudyInfoLoading } = useStudyInfo({ time: todayFormatted, year: currentYear, includeWeek: false });
  const { data: subjects, isLoading: isSubjectsLoading } = useSubjectData();

  const { data: loggedUserData, isLoading: isLoggedUserDataLoading } = useAccountData();

  const updateReminder = useUpdateReminder();
  const deleteReminder = useDeleteReminder();

  const isLoading = isRemindersByDateLoading || isStudyInfoLoading || isSubjectsLoading || dailyStudyInfoLoading || isLoggedUserDataLoading || isAllScheduleItemsLoading;

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
    ?.filter((item) => item.dayOfWeek === weekDay)
    ?.sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <Template loading={isLoading}>
      <div className="flex justify-between items-center">
        <Title>
          Hello, {loggedUserData?.name}!
        </Title>
        <Button onClick={() => setOpenAccountSettingsModal(true)} style="!bg-transparent">
          <SettingsIcon 
            sx={{ fill: theme.palette.gray.main, cursor: 'pointer' }}
            fontSize={'large'}
          />
        </Button>
      </div>
      <div className="flex flex-wrap gap-3">
        <MonthlyStudyTimeCard title="Current month's study time" data={studyInfo}/>

        <StudyCompletionStatsCard title="% of studies completed this month" data={studyInfo} />
      </div>

      <StudyStatusCard />

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

        <Container style="min-w-[300px] flex-1 text-center h-[400px]">
          <Subtitle>
            Daily study time
          </Subtitle>
          <PercentageStudyTimeChart 
            totalHours={formatTimeToNumber(dailyStudyInfo?.totalStudyTime)} 
            completedHours={formatTimeToNumber(dailyStudyInfo?.completedStudyTime)} 
          />
        </Container>
      </div>
      <UserAccountSettingsModal 
        handleClose={() => setOpenAccountSettingsModal(false)}
        open={openAccountSettingsModal}
        userData={loggedUserData}
      />
    </Template>
  );
}