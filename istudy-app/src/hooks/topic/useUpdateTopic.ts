import { useNotification } from "@/hooks/notification";
import { TopicUpdate } from "@/resources/services/topic/topic.resource";
import { useTopic } from "@/resources/services/topic/topic.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateTopic = (subjectName: string) => {
    const queryClient = useQueryClient();
    const topicService = useTopic();
    const notification = useNotification();

    return useMutation({
        mutationFn: ({ topic, id }: { topic: TopicUpdate; id: string }) => 
            topicService.update(topic, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subject', subjectName] });
            queryClient.invalidateQueries({ queryKey: ['subject-data'] });
            notification.notify("Topic updated successfully!", "success");
        },
    });
};