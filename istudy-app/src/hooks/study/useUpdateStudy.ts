import { useNotification } from "@/components";
import { StudyRequest } from "@/resources/services/study/study.resource";
import { useStudy } from "@/resources/services/study/study.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateStudy = () => {
    const queryClient = useQueryClient();
    const studyService = useStudy();
    const notification = useNotification();

    return useMutation({
        mutationFn: ({ study, id }: { study: StudyRequest; id: string }) => 
            studyService.update(study, id),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["study-data"] });
            notification.notify("Study updated successfully!", "success");
        },
    });
};
