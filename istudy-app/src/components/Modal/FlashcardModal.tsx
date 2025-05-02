'use client'

import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Input } from '@mui/material';
import { Button } from '../';
import { UseMutationResult } from '@tanstack/react-query';
import { Flashcard, FlashcardRequest, CardRequest } from '@/resources/services/flashcard/flashcard.resource';
import { useNotification } from '@/hooks/notification';
import { Add, Cancel } from '@mui/icons-material';

interface FlashcardModalProps {
    modalTitle: string,
    submitText: string,
    data?: Flashcard,
    createAction?: UseMutationResult<Flashcard[], Error, FlashcardRequest, unknown>;
    updateAction?: UseMutationResult<Flashcard[], Error, { flashcard: FlashcardRequest; id: string }, unknown>;
    open: boolean;
    handleClose: () => void;
}

export const FlashcardModal: React.FC<FlashcardModalProps> = ({ modalTitle, submitText, data, createAction, updateAction, open, handleClose }) => {
    const [cards, setCards] = useState<CardRequest[]>(data?.cards ?? []);
    const [title, setTitle] = useState<string>(data?.title ?? '');
    const notification = useNotification();

    const handleCreateCardField = () => {
        const updatedCards = [...cards, {question: '', answer: ''}];
        setCards(updatedCards);
    };
    
    const handleRemoveCard = (indexToRemove: number) => {
        const updatedCards = cards.filter((_, index) => index !== indexToRemove);
        setCards(updatedCards);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth={true}
            slotProps={{
                paper: {
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        if (cards.length < 5) return notification.notify("You need to create at least 5 cards", "error");

                        if (data?.id) {
                            updateAction?.mutate({ flashcard: { title, cards }, id: data.id }, {
                            onSuccess: () => handleClose(),
                          });
                        } else {
                            createAction?.mutate({ title, cards }, {
                            onSuccess: () => handleClose(),
                          });
                        }
                    }
                      
                },
            }}
        >
            <DialogTitle textAlign={'center'} textTransform={'uppercase'}>
              {modalTitle}
            </DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <span className="flex gap-2 items-end">
                    <label htmlFor="flashacardTitle" className="text-nowrap mr-2">Flashcard title:</label>
                    <Input 
                        id="flashacardTitle"
                        fullWidth={true} 
                        required
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        sx={{
                            minWidth: 'full-width',
                        }}
                    />
                </span>
                <div className='flex flex-col gap-5 items-center'>
                    <div className='w-full flex gap-5 justify-between items-center'>
                        <h3>CARDS</h3>
                        <Button onClick={handleCreateCardField}>
                            <Add />
                        </Button>
                    </div>
                    {cards.map((card, index) => (
                        <div key={index} className="w-full p-4 rounded-md gap-1 relative shadow-[0px_0px_3px_0px_rgba(117,117,117,0.57)]">
                            <h4 className='text-center text-gray-400'>Card #{index+1}</h4>
                        
                            <div className='w-full'>
                                <span className="flex gap-2 w-full items-end">
                                    <label htmlFor="cardQuestion" className='w-fit'>Question:</label>
                                    <Input 
                                        id="cardQuestion"
                                        fullWidth={true} 
                                        required
                                        value={card.question}
                                        onChange={(event) => {
                                            const updatedCards = [...cards];
                                            updatedCards[index].question = event.target.value;
                                            setCards(updatedCards);
                                        }}
                                        
                                        sx={{
                                            minWidth: 'full-width',
                                        }}
                                    />
                                </span>
                                <span className="flex gap-2 w-full items-end mt-2">
                                    <label htmlFor="cardAnswer">Answer:</label>
                                    <Input 
                                        id="cardAnswer"
                                        fullWidth={true} 
                                        required
                                        value={card.answer}
                                        onChange={(event) => {
                                            const updatedCards = [...cards];
                                            updatedCards[index].answer = event.target.value;
                                            setCards(updatedCards);
                                        }}
                                        
                                        sx={{
                                            minWidth: 'full-width',
                                        }}
                                    />
                                </span>
                            </div>
                            <Button style='absolute top-3 right-3 !bg-transparent !text-red-500 !px-0 !py-0 h-fit'
                                onClick={() => handleRemoveCard(index)}
                            > 
                                <Cancel fontSize='small'/>
                            </Button>
                        </div>
                    ))}
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} style='!bg-transparent !text-red-500'>Cancel</Button>
                <Button type="submit">{submitText}</Button>
            </DialogActions>
        </Dialog>
    );
};