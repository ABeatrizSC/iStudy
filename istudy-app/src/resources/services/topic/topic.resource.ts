import { Subject } from "../subject/subject.resource";

export interface Topic {
    id: string;
    name: string;
    time: string;
    isCompleted: boolean;
    subject: Subject;
}

export interface TopicRequest {
    name: string;
    time: string;
    isCompleted: boolean;
    subjectId: string; 
}

export interface TopicResponse{
    id: string;
    name: string;
    time: string;
    isCompleted: boolean;
    subjectId: string; 
}

export interface TopicUpdate{
    name: string;
    time: string;
    isCompleted: boolean;
}