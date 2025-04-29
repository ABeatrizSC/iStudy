import { useNotification } from "@/hooks/notification";
import { SubjectRequest } from "@/resources/services/subject/subject.resource";
import { useSubject } from "@/resources/services/subject/subject.service";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateSubject = () => {
    const queryClient = useQueryClient();
    const subjectService = useSubject();
    const notification = useNotification();

    return useMutation({
        mutationFn: (subject: SubjectRequest) => subjectService.create(subject),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["subject-data"] });
            notification.notify("Subject created successfully!", "success");
        },
    });
};