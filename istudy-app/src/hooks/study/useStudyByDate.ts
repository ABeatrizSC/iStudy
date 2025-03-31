import { useStudy } from "@/resources/services/study/study.service";
import { useQuery } from "@tanstack/react-query"

export const useStudyByDate = (date: string) => {
    const studyService = useStudy();

    const query = useQuery({
        queryKey: ['study-data', date],
        queryFn: () => studyService.getByDate(date),
        enabled: !!date,
    })

    return query;
}