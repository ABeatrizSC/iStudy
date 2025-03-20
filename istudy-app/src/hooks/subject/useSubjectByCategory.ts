import { useSubject } from "@/resources/services/subject/subject.service";
import { useQuery } from "@tanstack/react-query"

export const useSubjectByCategory = (category: string) => {
    const subjectService = useSubject();

    const query = useQuery({
        queryKey: ['subject-data', category],
        queryFn: () => subjectService.getAllByCategory(category),
        enabled: !!category,
    })

    return query;
}