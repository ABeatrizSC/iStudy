import theme from "@/resources/assets/styles/Theme"
import { AccessTime, CalendarMonth, CheckCircleOutline, Delete, Edit, Topic } from "@mui/icons-material"
import { alpha } from "@mui/material"
import { Button, StudyInfo, CategoryBorder } from ".."
import { Study } from "@/resources/services/study/study.resource"
import { formatDate, formatTime } from "@/utils/formatters"

interface StudyBoxProps {
    study: Study,
    openDeleteModalFunc: () => void,
    openUpdateModalFunc: () => void
    setStudySelectedFunc: (value: Study) => void,
}

export const StudyBox: React.FC<StudyBoxProps> = ({ study, openDeleteModalFunc, openUpdateModalFunc, setStudySelectedFunc }) => {
    return (
          <div 
            key={study.id} 
            className={`min-w-[220px] max-w-[270px] h-[170px] group flex flex-col flex-grow flex-1 pt-3 pb-8 px-4 rounded-lg gap-1 relative overflow-hidden shadow-[0px_1px_5px_0px_rgba(117,117,117,0.57)] transition-transform duration-200 hover:scale-105 ${study.isCompleted ? 'opacity-75' : ''}`}
        >
            <h3 className="text-wrap">{study.disciplineName ?? ""}</h3>
            <StudyInfo info={study.topicName ?? ""}>
                <Topic fontSize="small" />
            </StudyInfo>
            <StudyInfo info={formatDate(study.date)}>
                <CalendarMonth fontSize="small" />
            </StudyInfo>
            <StudyInfo info={formatTime(study.time)}>
                <AccessTime fontSize="small" />
            </StudyInfo>

            <CategoryBorder 
                category={study.disciplineCategory ?? ""} 
            />

            <div 
                className="absolute top-0 left-0 w-full h-full flex items-center justify-center gap-3 hidden group-hover:flex" 
                style={{ backgroundColor: alpha(theme.palette.text.secondary, 0.8) }}
            >
                <Button onClick={() => {
                    openUpdateModalFunc()
                    setStudySelectedFunc(study)
                }}>
                    <Edit fontSize="small"/>
                </Button>
                <Button color="red" onClick={() => {
                        openDeleteModalFunc(),
                        setStudySelectedFunc(study)
                    }}>
                    <Delete fontSize="small"/>
                </Button>
            </div>
            {study.isCompleted ? 
                <CheckCircleOutline sx={{ position: 'absolute', top: '10px', right: '10px' }} color="success" />
            : null}
        </div>
    )
}