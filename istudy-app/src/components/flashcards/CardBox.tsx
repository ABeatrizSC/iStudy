'use client'

import { Checkbox, Typography } from "@mui/material"
import { Button } from ".."
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import { Card } from "@/resources/services/flashcard/flashcard.resource";
import ReactFlipCard from 'reactjs-flip-card';

interface CardBoxProps {
    cardData: Card,
    isFlipped: boolean,
    handleFlip: () => void,
    handleIsHitChange: () => void
}

export const CardBox: React.FC<CardBoxProps> = ({ cardData, isFlipped, handleFlip, handleIsHitChange }) => {
    return (
        <div className="relative w-full h-full flex flex-col justify-center items-center text-center p-4 text-white">
            <ReactFlipCard
                frontComponent={
                    <div className='h-full w-full flex flex-col'>
                        <Typography variant="h5">Question:</Typography>
                        <Typography variant="h6" className='!mt-auto !mb-auto'>{cardData.question}</Typography>
                    </div>
                }
                backComponent={
                    <div className='h-full w-full flex flex-col items-center justify-center'>
                        <Typography variant="h5">Answer:</Typography>
                        <Typography variant="h6" className='!mt-auto !mb-auto'>{cardData.answer}</Typography>
                    </div>
                }
                flipByProp={isFlipped}
                flipTrigger={'disabled'}
            />

            <span className="absolute bottom-0 left-3 flex flex-row gap-2 items-center font-normal" onClick={handleIsHitChange}>
                <Checkbox 
                    id='isHit' 
                    color="success" 
                    checked={cardData.isHit} 
                    onChange={handleIsHitChange}
                    size="medium"
                    sx={{ padding: 0, position: 'relative', zIndex: 2 }}
                />
                <label htmlFor="isHit" className="mr-2 cursor-pointer">
                    I got it right
                </label>
                {cardData.isHit && <div className='h-4 w-4 bg-white absolute left-1'></div>}                     
            </span>
            <Button onClick={handleFlip} style='absolute bottom-0 right-3 !px-0 !py-0'>
                <ThreeSixtyIcon fontSize='large' />
            </Button>
        </div>
    )
}