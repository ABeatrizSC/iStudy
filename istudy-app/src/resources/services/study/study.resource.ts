export interface Study {
    id: string,
    createdBy: string,
    disciplineId: string,
    topicId: string,
    time: string,
    date: string,
    isCompleted: boolean
}

export interface StudyRequest {
    disciplineName: string,
    topicName: string,
    time: string,
    date: string,
    isCompleted: boolean
}

export interface StudyResponse {
    id: string,
    createdBy: string,
    time: string,
    date: string,
    isCompleted: boolean
    discipline: DisciplineVo,
}

export interface StudyInfo {
    totalStudyTime: string,
    completedStudyTime: string,
    completedStudyTimeByDiscipline: StudyTime[];
    completedStudyTimeByDisciplineCategory: StudyTime[];
}

export interface StudyTime {
    name: string,
    completedTime: string,
}

export interface DisciplineVo {
    id: string,
    createdBy: string,
    name: string,
    category: string,
    totalTime: string,
    timeCompleted: string,
    isCompleted: boolean,
    topic: TopicVo,
}

export interface TopicVo {
    id: string,
    name: string,
    time: string,
    isCompleted: boolean
}