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
    totalStudyTime: string,
    completedStudyTime: string,
    completedStudyTimeByDiscipline: StudyTime[];
    completedStudyTimeByDisciplineCategory: StudyTime[];
}

export interface StudyTime {
    name: string,
    completedTime: string,
}