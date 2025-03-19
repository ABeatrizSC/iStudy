import { useSubject } from "@/resources/services/subject/subject.service";
import { useQuery } from "@tanstack/react-query"

export const useSubjectCategories= () => {
    const subjectService = useSubject();

    const query = useQuery({
        queryFn: () => subjectService.getAllCategories(),
        queryKey: ['subjects-categories']
    })

    return query;
}