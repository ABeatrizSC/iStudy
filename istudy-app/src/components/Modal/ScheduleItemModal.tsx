'use client'

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Dialog, Input, MenuItem, Select } from '@mui/material';
import { Button, TimeInput } from '../';
import { useEffect, useState } from 'react';
import { UseMutationResult } from '@tanstack/react-query';
import { mapScheduleItemToRequest } from '@/utils/mappers';
import dayjs from 'dayjs';
import { ScheduleItem, ScheduleItemRequest } from '@/resources/services/schedule-item/schedule.resource';
import { dayOfWeek } from '@/constants/dayOfWeek';

interface ScheduleItemModalProps {
    title: string;
    submitText: string;
    data?: ScheduleItem;
    createAction?: UseMutationResult<ScheduleItem[], Error, ScheduleItemRequest, unknown>;
    updateAction?: UseMutationResult<ScheduleItem[], Error, { schedule: ScheduleItemRequest; id: string; }, unknown>;
    open: boolean;
    handleClose: () => void;
}

export const ScheduleItemModal: React.FC<ScheduleItemModalProps> = ({ title, submitText, data, createAction, updateAction, open, handleClose }) => {
    const [itemFormData, setItemFormData] = useState<ScheduleItemRequest>(mapScheduleItemToRequest(data));

    useEffect(() => {
        if (open) {
            setItemFormData(mapScheduleItemToRequest(data));
        }
    }, [open]);

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
                      if (data?.id) {
                        updateAction?.mutate({ schedule: itemFormData, id: data.id }, {
                          onSuccess: () => handleClose(),
                        });
                      } else {
                        createAction?.mutate(itemFormData, {
                            onSuccess: () => handleClose(),
                        });    
                      }                        
                  },
                },
            }}
        >
            <DialogTitle textAlign={'center'} textTransform={'uppercase'}>
              {title}
            </DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '40px'}}>
                <span className="flex flex-col gap-2">
                    <label htmlFor='activity' className="mr-2">Activity:</label>
                     <Input 
                        id="activity"
                        placeholder="Activity name" 
                        fullWidth={true} 
                        value={itemFormData.title}
                        required
                        onChange={(event) =>
                            setItemFormData((prev) => ({
                                ...prev,
                                title: event.target.value,
                            }))
                        }
                        sx={{
                            minWidth: 'full-width',
                        }}
                    />
                </span>
                <span className='flex flex-col gap-2'>
                    <label htmlFor='start-time' className="mr-2">Start time:</label>
                    <TimeInput 
                        id='start-time'
                        value={itemFormData.startTime}
                        format='HH:mm'
                        onChangeFunc={(value) => setItemFormData((prev) => ({
                            ...prev,
                            startTime: value ? dayjs(value).format("HH:mm") : "00:00", 
                        }))}
                    />
                </span>
                <span className='flex flex-col gap-2'>
                    <label htmlFor='end-time' className="mr-2">End time:</label>
                    <TimeInput 
                        id='end-time'
                        value={itemFormData.endTime}
                        format='HH:mm'
                        onChangeFunc={(value) => setItemFormData((prev) => ({
                            ...prev,
                            endTime: value ? dayjs(value).format("HH:mm") : "00:00", 
                        }))}
                    />
                </span>
                <span className="flex flex-col gap-2">
                    <label htmlFor='dayOfWeek' className="mr-2">Day of week:</label>
                    <Select
                        id="dayOfWeek"
                        required
                        value={itemFormData.dayOfWeek}
                        onChange={(event) =>
                            setItemFormData((prev) => ({
                                ...prev,
                                dayOfWeek: Number(event.target.value)
                            }))
                        }
                        sx={{width: 'full-width'}}
                    >
                        {dayOfWeek.map((day) => (
                            <MenuItem key={day.id} value={day.id}>
                                {day.label}
                            </MenuItem>
                        ))}
                    </Select>
                </span>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} style='!bg-transparent !text-red-500'>Cancel</Button>
                <Button type="submit">{submitText}</Button>
            </DialogActions>
        </Dialog>
    );
};