'use client'

import { alpha } from "@mui/material";
import { Button } from "../Button";
import theme from "@/resources/assets/styles/Theme";
import { Delete, Edit, PlayArrow } from "@mui/icons-material";
import StyleIcon from '@mui/icons-material/Style';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import { Flashcard } from "@/resources/services/flashcard/flashcard.resource";

interface FlashcardBoxProps {
    flashcardData: Flashcard,
    setFlashcardSelected: () => void,
    openStartOptions: () => void,
    openUpdateModal: () => void,
    openDeleteModal: () => void
}

export const FlashcardBox: React.FC<FlashcardBoxProps> = ({ flashcardData, setFlashcardSelected, openStartOptions, openUpdateModal, openDeleteModal }) => {
    return (
    <div 
        className="h-fit group flex flex-col pt-3 pb-8 px-4 rounded-lg gap-1 relative overflow-hidden shadow-[0px_1px_5px_0px_rgba(117,117,117,0.57)] transition-transform duration-200 hover:scale-105"
        key={flashcardData.id}
    >
        <h3 className="text-wrap">{flashcardData.title}</h3>
        <p className="text-gray-500 text-sm">
            <StyleIcon fontSize="small" sx={{ marginRight: '5px' }} />
            {flashcardData.cards.length} flashcards
        </p>
        <p className="text-gray-500 text-sm">
            <TrackChangesIcon fontSize="small" sx={{ marginRight: '5px' }} />
            {flashcardData.cards.filter(f => f.isHit).length} hits
        </p>

        <div 
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center gap-3 hidden group-hover:flex" 
            style={{ backgroundColor: alpha(theme.palette.text.secondary, 0.8) }}
        >
            <Button color="green" onClick={() => {
                setFlashcardSelected(),
                openStartOptions()
            }}>
                <PlayArrow fontSize="small"/>
            </Button>
            <Button onClick={() => {
                setFlashcardSelected();
                openUpdateModal();
            }}>
                <Edit fontSize="small"/>
            </Button>
            <Button color="red" onClick={() => {
                setFlashcardSelected();
                openDeleteModal();
            }}>
                <Delete fontSize="small"/>
            </Button>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-2 text-center text-white flex items-center justify-center" style={{ backgroundColor: theme.palette.primary.main }} />
    </div>
    )
}