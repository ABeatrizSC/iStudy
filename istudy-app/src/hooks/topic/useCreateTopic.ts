import { useNotification } from "@/hooks/notification";
import { TopicRequest } from "@/resources/services/topic/topic.resource";
import { useTopic } from "@/resources/services/topic/topic.service";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateTopic = (subjectName: string) => {
    const queryClient = useQueryClient();
    const topicService = useTopic();
    const notification = useNotification();

    return useMutation({
        mutationFn: (topic: TopicRequest) => topicService.create(topic),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subject', subjectName] });
            queryClient.invalidateQueries({ queryKey: ['subject-data'] });
            notification.notify("Topic created successfully!", "success");
        },
    });
};