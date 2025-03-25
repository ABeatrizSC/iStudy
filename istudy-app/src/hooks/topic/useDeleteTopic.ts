import { useNotification } from "@/components/notification";
import { useTopic } from "@/resources/services/topic/topic.service";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteTopic = (subjectName: string) => {
    const queryClient = useQueryClient();
    const topicService = useTopic();
    const notification = useNotification();

    return useMutation({
        mutationFn: (id: string) => topicService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subject', subjectName] });
            notification.notify("Subject deleted successfully!", "success");
        },
    });
};