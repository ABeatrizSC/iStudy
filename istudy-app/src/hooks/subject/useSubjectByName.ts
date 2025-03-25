import { useSubject } from "@/resources/services/subject/subject.service";
import { useQuery } from "@tanstack/react-query"

export const useSubjectByName = (name?: string) => {
    const subjectService = useSubject();

    return useQuery({
        queryKey: ['subject', name],
        queryFn: () => subjectService.getByName(name!)
    });
};
