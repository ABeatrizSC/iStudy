import { useNotification } from "@/hooks/notification";
import { useSubject } from "@/resources/services/subject/subject.service";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteSubject = () => {
    const queryClient = useQueryClient();
    const subjectService = useSubject();
    const notification = useNotification();

    return useMutation({
        mutationFn: (id: string) => subjectService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["subject-data"] });
            notification.notify("Subject deleted successfully!", "success");
        },
    });
};