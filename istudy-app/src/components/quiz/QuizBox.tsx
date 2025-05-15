'use client'

import { alpha } from "@mui/material";
import { Button } from "../";
import theme from "@/resources/assets/styles/Theme";
import { Delete, Edit, PlayArrow } from "@mui/icons-material";
import QuizIcon from '@mui/icons-material/Quiz';
import CheckIcon from '@mui/icons-material/Check';
import { Quiz } from "@/resources/services/quiz/quiz.resource";

interface QuizBoxProps {
    quizData: Quiz,
    setQuizSelected: () => void,
    openStartOptions: () => void,
    openUpdateModal: () => void,
    openDeleteModal: () => void
}

export const QuizBox: React.FC<QuizBoxProps> = ({ quizData, setQuizSelected, openStartOptions, openUpdateModal, openDeleteModal }) => {
    return (
    <div 
        className="min-h-[100px] flex rounded-lg overflow-hidden shadow-[0px_1px_5px_0px_rgba(117,117,117,0.57)] transition-transform duration-200 hover:scale-105"
        key={quizData.id}
    >
        <div className="relative group flex-1 flex flex-col justify-between py-3 px-4">
            <h3 className="text-wrap">{quizData.title}</h3>
            <div>
                <p className="text-gray-500 text-sm">
                    <QuizIcon fontSize="small" sx={{ marginRight: '5px' }} />
                    {quizData.questions.length} questions
                </p>
                <p className="text-gray-500 text-sm">
                    <CheckIcon fontSize="small" sx={{ marginRight: '5px' }} />
                    {quizData.questions.filter(q => q.correctAnswer).length} correct answers
                </p>
            </div>
            <div 
                className="absolute top-0 left-0 w-full h-full flex items-center justify-center gap-3 hidden group-hover:flex" 
                style={{ backgroundColor: alpha(theme.palette.text.secondary, 0.8) }}
            >
                <Button onClick={() => {
                    setQuizSelected();
                    openUpdateModal();
                }}>
                    <Edit fontSize="small"/>
                </Button>
                <Button color="red" onClick={() => {
                    setQuizSelected();
                    openDeleteModal();
                }}>
                    <Delete fontSize="small"/>
                </Button>
            </div>
        </div>

        <div className="w-fit h-full flex items-center justify-center" style={{ backgroundColor: theme.palette.primary.main }}>
            <Button 
                style={'!h-full'}
                onClick={() => {
                    setQuizSelected(),
                    openStartOptions()
                }}
            >
                <PlayArrow fontSize="small"/>
            </Button>
        </div>
    </div>
    )
}