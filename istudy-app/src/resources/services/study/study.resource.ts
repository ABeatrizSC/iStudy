export interface Study {
    id: string,
    createdBy: string,
    disciplineName: string,
    topicName: string,
    disciplineCategory: string,
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

export interface StudyInfo {
    totalStudies: number;
    totalCompletedStudies: number;
    totalStudyTime: string,
    completedStudyTime: string,
    completedStudyTimeByDiscipline: StudyTime[];
    completedStudyTimeByDisciplineCategory: StudyTime[];
}

export interface StudyTime {
    name: string,
    completedTime: string,
}

export interface DailyStudyStatus {
    date: string,
    metGoal: boolean,
    dayStudied: boolean
}