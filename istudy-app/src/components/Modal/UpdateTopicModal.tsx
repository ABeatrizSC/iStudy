'use client'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Input } from '@mui/material';
import { Button, TimeInput } from '../';
import { Topic, TopicResponse, TopicUpdate } from '@/resources/services/topic/topic.resource';
import { UseMutationResult } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

interface UpdateTopicModalProps {
    data?: Topic,
    action: UseMutationResult<TopicResponse[], Error, { topic: TopicUpdate; id: string; }, unknown>;
    open: boolean;
    handleClose: () => void;
}

export const UpdateTopicModal: React.FC<UpdateTopicModalProps> = ({ data, action, open, handleClose }) => {
    const [topicFormData, setTopicFormData] = useState<TopicUpdate>({ 
        name: '', 
        time: '00:00', 
        isCompleted: false, 
    });

    useEffect(() => {
        if (open) {
            setTopicFormData({
                name: data?.name ?? '',
                time: data?.time ?? '00:00',
                isCompleted: data?.isCompleted ?? false,
            });
        }
    }, [open]);    

    const resetForm = () => {
        setTopicFormData({
            name: '',
            time: '00:00',
            isCompleted: false,
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
                        action.mutate({topic: topicFormData, id: data?.id ?? ""}, {
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
                Update a topic
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
                <Button type="submit">Update</Button>
            </DialogActions>
        </Dialog>
    );
};