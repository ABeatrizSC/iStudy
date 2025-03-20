import { useSubject } from "@/resources/services/subject/subject.service";
import { useQuery } from "@tanstack/react-query"

export const useSubjectData = () => {
    const subjectService = useSubject();

    const query = useQuery({
        queryFn: () => subjectService.getAll(),
        queryKey: ['subject-data']
    })

    return query;
}