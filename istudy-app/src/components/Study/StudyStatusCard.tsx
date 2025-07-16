import React from "react"
import { Container, StudyStatusBox } from "../"
import { Subtitle } from "../Home/Subtitle"
import dayjs from "dayjs"
import { useDailyStudyStatus } from "@/hooks/study/useDailyStudyStatus"


export const StudyStatusCard: React.FC = () => {
    const today = dayjs();
    const fifteenDaysAgo = today.subtract(14, "day");
    const startDate = fifteenDaysAgo.format("YYYY-MM-DD");
    const endDate = today.format("YYYY-MM-DD");

    const { data: studyStatus, isLoading: isStudyStatusLoading} = useDailyStudyStatus(startDate, endDate)

    return (
        <Container>
            <Subtitle>
                Study Status from the Last 15 Days
            </Subtitle>

            <div className='flex flex-wrap gap-3 justify-center lg:justify-between'>
                {studyStatus?.map((status, index) => {
                return (
                    <StudyStatusBox 
                    key={index} 
                    status={status}
                    />
                );
                })}
            </div>
        </Container>
    )
}