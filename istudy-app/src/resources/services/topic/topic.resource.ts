import { Subject } from "../subject/subject.resource";

export interface Topic {
    id: string;
    name: string;
    time: string;
    isCompleted: boolean;
    discipline: Subject | null;
}

export interface TopicRequest {
    name: string;
    time: string;
    isCompleted: boolean;
    disciplineId: string; 
}

export interface TopicResponse{
    id: string;
    name: string;
    time: string;
    isCompleted: boolean;
    disciplineId: string; 
}

export interface TopicUpdate{
    name: string;
    time: string;
    isCompleted: boolean;
}