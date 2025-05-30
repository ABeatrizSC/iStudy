'use client'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Input } from '@mui/material';
import { Button, TimeInput } from '../';
import { Topic, TopicRequest, TopicResponse } from '@/resources/services/topic/topic.resource';
import { UseMutationResult } from '@tanstack/react-query';
import { useState } from 'react';
import dayjs from 'dayjs';

interface CreateTopicModalProps {
    data?: Topic,
    subjectId: string,
    action: UseMutationResult<TopicResponse[], Error, TopicRequest, unknown>;
    open: boolean;
    handleClose: () => void;
}


export const CreateTopicModal: React.FC<CreateTopicModalProps> = ({ data, subjectId, action, open, handleClose }) => {
    const [topicFormData, setTopicFormData] = useState<TopicRequest>({ 
        name: data?.name ?? '', 
        time: data?.time ?? '00:00', 
        isCompleted: data?.isCompleted ?? false, 
        disciplineId: subjectId 
    });

    const resetForm = () => {
        setTopicFormData({
            name: '',
            time: '00:00',
            isCompleted: false,
            disciplineId: subjectId,
        });
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
                        action.mutate(topicFormData, {
                            onSuccess: () => {
                                handleClose(),
                                resetForm()
                            },
                        });
                    }                
                },
            }}
        >
            <DialogTitle textAlign={'center'} textTransform={'uppercase'}>
              Create a new topic
            </DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <span className="flex flex-col gap-2">
                <label htmlFor="topicName" className="mr-2">Name:</label>
                <Input 
                    id="topicName"
                    placeholder="Topic name" 
                    fullWidth={true} 
                    required
                    value={topicFormData.name}
                    onChange={(event) =>
                        setTopicFormData((prev) => ({
                            ...prev,
                            name: event.target.value
                        }))
                    }
                    sx={{
                        minWidth: 'full-width',
                    }}
                />
            </span>
            <span className='flex flex-col gap-2'>
                <label htmlFor="time" className="mr-2">Time:</label>
                <TimeInput
                    id="time" 
                    format='HH:mm' 
                    value={topicFormData.time}
                    onChangeFunc={(value) => setTopicFormData((prev) => ({
                        ...prev,
                        time: value ? dayjs(value).format("HH:mm") : "00:00", 
                    }))}
                />
            </span>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} style='!bg-transparent !text-red-500'>Cancel</Button>
                <Button type="submit">Create</Button>
            </DialogActions>
        </Dialog>
    );
};