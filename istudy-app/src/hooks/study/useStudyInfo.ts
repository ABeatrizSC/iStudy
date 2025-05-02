import { TimeType } from "@/app/types";
import { useStudy } from "@/resources/services/study/study.service";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);

export const useStudyInfo = ({ time, year, includeWeek }: TimeType) => {
  const studyService = useStudy();

  return useQuery({
    queryKey: ['study-info', time, includeWeek],
    queryFn: () => {
      if (includeWeek) {
        const weekNumber = dayjs(time).isoWeek();
        return studyService.getWeekInfo(year, weekNumber);
      }

      return typeof time === 'string'
        ? studyService.getDayInfo(time)
        : studyService.getMonthInfo(year, time);
    },
    enabled: !!time,
  });
};