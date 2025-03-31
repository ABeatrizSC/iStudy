import { useNotification } from "@/components";
import { useStudy } from "@/resources/services/study/study.service";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteStudy= () => {
    const queryClient = useQueryClient();
    const studyService = useStudy();
    const notification = useNotification();

    return useMutation({
        mutationFn: (id: string) => studyService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["study-data"] });
            notification.notify("Study deleted successfully!", "success");
        },
    });
};