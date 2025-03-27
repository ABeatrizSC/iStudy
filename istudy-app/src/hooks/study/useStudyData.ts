import { useStudy } from "@/resources/services/study/study.service";
import { useQuery } from "@tanstack/react-query"

export const useStudyData = () => {
    const studyService = useStudy();

    const query = useQuery({
        queryFn: () => studyService.getAll(),
        queryKey: ['study-data']
    })

    return query;
}