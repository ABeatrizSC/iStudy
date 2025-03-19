import { useSubject } from "@/resources/services/subject/subject.service";
import { useQuery } from "@tanstack/react-query"

export const useSubjectBySearch = (name: string) => {
    const subjectService = useSubject();

    const query = useQuery({
        queryKey: ['subject-data', name],
        queryFn: () => subjectService.search(name),
        enabled: !!name,
    })

    return query;
}