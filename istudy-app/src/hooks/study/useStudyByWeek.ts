import { useStudy } from "@/resources/services/study/study.service";
import { useQuery } from "@tanstack/react-query"

export const useStudyByWeek = (year: number, week: number) => {
    const studyService = useStudy();

    const query = useQuery({
        queryKey: ['study-by-week', week],
        queryFn: () => studyService.getByWeek(year, week),
        enabled: !!week,
    })

    return query;
}