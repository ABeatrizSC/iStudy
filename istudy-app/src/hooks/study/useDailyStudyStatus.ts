import { useStudy } from "@/resources/services/study/study.service";
import { useQuery } from "@tanstack/react-query";

export const useDailyStudyStatus = (startDate: string, endDate: string) => {
  const studyService = useStudy();

  const query = useQuery({
    queryKey: ["daily-study-status", startDate, endDate],
    queryFn: () => studyService.getStudyStatusBetweenDates(startDate, endDate),
    enabled: !!startDate && !!endDate,
  });

  return query;
};