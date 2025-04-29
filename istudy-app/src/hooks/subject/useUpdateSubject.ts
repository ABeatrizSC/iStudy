import { useNotification } from "@/hooks/notification";
import { SubjectRequest } from "@/resources/services/subject/subject.resource";
import { useSubject } from "@/resources/services/subject/subject.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateSubject = () => {
    const queryClient = useQueryClient();
    const subjectService = useSubject();
    const notification = useNotification();

    return useMutation({
        mutationFn: ({ subject, id }: { subject: SubjectRequest; id: string }) => 
            subjectService.update(subject, id),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["subject-data"] });
            notification.notify("Subject updated successfully!", "success");
        },
    });
};
