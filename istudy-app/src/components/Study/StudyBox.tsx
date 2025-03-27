import theme from "@/resources/assets/styles/Theme"
import { AccessTime, CalendarMonth, Delete, Edit, Topic } from "@mui/icons-material"
import { alpha } from "@mui/material"
import { Button, StudyInfo } from ".."
import { StudyResponse } from "@/resources/services/study/study.resource"
import { formatDate, formatTime } from "@/utils/formatters"
import { CategoryBorder } from ".."

interface StudyBoxProps {
    study: StudyResponse,
}

export const StudyBox: React.FC<StudyBoxProps> = ({ study: {id, time, date, isCompleted, discipline} }) => {
    return (
          <div 
            key={id} 
            className="min-w-[220px] max-w-[270px] h-[170px] group flex flex-col flex-grow flex-1 bg-gray-100 pt-3 pb-8 px-4 rounded-lg gap-1 relative overflow-hidden shadow-[0px_1px_5px_0px_rgba(117,117,117,0.57)] transition-transform duration-200 hover:scale-105"
        >
            <h3 className="text-wrap">{discipline.name}</h3>
            <StudyInfo info={discipline.topic.name}>
                <Topic fontSize="small" />
            </StudyInfo>
            <StudyInfo info={formatDate(date)}>
                <CalendarMonth fontSize="small" />
            </StudyInfo>
            <StudyInfo info={formatTime(time)}>
                <AccessTime fontSize="small" />
            </StudyInfo>

            <CategoryBorder 
                category={discipline.category} 
            />

            <div 
                className="absolute top-0 left-0 w-full h-full flex items-center justify-center gap-3 hidden group-hover:flex" 
                style={{ backgroundColor: alpha(theme.palette.text.secondary, 0.8) }}
            >
                <Button>
                    <Edit fontSize="small"/>
                </Button>
                <Button color="red">
                    <Delete fontSize="small"/>
                </Button>
            </div>
        </div>
    )
}