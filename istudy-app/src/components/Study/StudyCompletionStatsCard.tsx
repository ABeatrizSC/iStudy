import React from "react"
import { Container } from "../"
import { Subtitle } from "../Home/Subtitle"
import theme from "@/resources/assets/styles/Theme"
import { StudyInfo } from "@/resources/services/study/study.resource"

interface StudyCompletionStatsCardProps {
  title: string,
  data: StudyInfo | undefined
}

export const StudyCompletionStatsCard: React.FC<StudyCompletionStatsCardProps> = ({ title, data }) => {
    const studiesCompletedQtt = data?.totalCompletedStudies || 0;
    const totalStudiesQtt = data?.totalStudies || 0;
    const studiesIncompletedQtt = totalStudiesQtt - studiesCompletedQtt;

    const studiesCompletedPercentage = (studiesCompletedQtt/totalStudiesQtt)*100;

    return (
       <Container style="w-full sm:min-w-[200px] w-full md:w-[calc(50%-0.375rem)]">
          <Subtitle>
            {title}
          </Subtitle>
          <div className="flex flex-wrap justify-between gap-2">
            <div className="min-w-fit">
              <span style={{ color: theme.palette.green.main, display: "block" }}>
                {studiesCompletedQtt} completed
              </span>
              <span style={{ color: theme.palette.red.main, display: "block" }}>
                {studiesIncompletedQtt} incompleted
              </span>
            </div>
            <span
              style={{ color: theme.palette.gray.main }}
              className="bold text-2xl sm:text-3xl lg:text-4xl mt-auto"
            >
              {!isNaN(studiesCompletedPercentage) ? studiesCompletedPercentage.toFixed(2) : 0}%
            </span>
          </div>
        </Container>
    )
}