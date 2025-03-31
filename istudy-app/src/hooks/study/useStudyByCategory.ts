import { useStudy } from "@/resources/services/study/study.service";
import { useQuery } from "@tanstack/react-query"

export const useStudyByCategory = (category: string) => {
    const studyService = useStudy();

    const query = useQuery({
        queryKey: ['study-data', category],
        queryFn: () => studyService.getByDisciplineCategory(category),
        enabled: !!category,
    })

    return query;
}