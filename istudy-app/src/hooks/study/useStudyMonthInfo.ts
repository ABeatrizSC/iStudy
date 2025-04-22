import { useStudy } from "@/resources/services/study/study.service";
import { useQuery } from "@tanstack/react-query"

export const useStudyMonthInfo = (month: number) => {
    const studyService = useStudy();

    const query = useQuery({
        queryKey: ['study-month-info', month],
        queryFn: () => studyService.getMonthInfo(2025, month),
        enabled: !!month,
    })

    return query;
}