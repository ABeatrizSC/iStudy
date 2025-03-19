import { Topic } from "../topic/topic.resource";

export interface Subject {
    id: string;
    createdBy: string;
    name: string;
    category: string;
    totalTime: string;
    timeCompleted: string;
    isCompleted: boolean;
    topics: Topic[] | null;
}

export interface SubjectRequest {
    name: string;
    category: string | null;
}