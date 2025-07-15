import React from "react"
import { Container } from "../"
import { Subtitle } from "../Home/Subtitle"
import theme from "@/resources/assets/styles/Theme"
import { formatTime } from "@/utils/formatters"
import { StudyInfo } from "@/resources/services/study/study.resource"

interface MonthlyStudyTimeCardProps {
    title: string,
    data: StudyInfo | undefined
}

export const MonthlyStudyTimeCard: React.FC<MonthlyStudyTimeCardProps> = ({ title, data }) => {
    return (
        <Container style="w-full sm:min-w-[200px] w-full md:w-[calc(50%-0.375rem)]">
            <Subtitle>
                {title}
            </Subtitle>
            <span
                style={{ color: theme.palette.gray.main }}
                className="bold text-2xl sm:text-3xl lg:text-4xl self-end mt-auto block"
            >
                {formatTime(data?.completedStudyTime)}
            </span>
        </Container>
    )
}