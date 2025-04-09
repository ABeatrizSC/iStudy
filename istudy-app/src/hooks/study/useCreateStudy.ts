import { useNotification } from "@/components";
import { StudyRequest } from "@/resources/services/study/study.resource";
import { useStudy } from "@/resources/services/study/study.service";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateStudy = () => {
    const queryClient = useQueryClient();
    const studyService = useStudy();
    const notification = useNotification();

    return useMutation({
        mutationFn: (study: StudyRequest) => studyService.create(study),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["study-data"] });
            notification.notify("Study created successfully!", "success");
        },
    });
};