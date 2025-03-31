'use client'

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Checkbox, Dialog, MenuItem, Select } from '@mui/material';
import { Button, DateInput, TimeInput } from '../';
import { useEffect, useState } from 'react';
import { UseMutationResult } from '@tanstack/react-query';
import { StudyRequest, Study } from '@/resources/services/study/study.resource';
import { useSubjectData } from '@/hooks/subject';
import { formatSavedDate } from '@/utils/formatters';
import { mapStudyToRequest } from '@/utils/mappers';
import dayjs from 'dayjs';

interface StudyModalProps {
    title: string;
    submitText: string;
    data?: Study;
    createAction?: UseMutationResult<Study[], Error, StudyRequest, unknown>;
    updateAction?: UseMutationResult<Study[], Error, { study: StudyRequest; id: string; }, unknown>;
    open: boolean;
    handleClose: () => void;
}

export const StudyModal: React.FC<StudyModalProps> = ({ title, submitText, data, createAction, updateAction, open, handleClose }) => {
    const [studyFormData, setStudyFormData] = useState<StudyRequest>(mapStudyToRequest(data));

    const { data: subjects } = useSubjectData();

    useEffect(() => {
        if (open) {
            setStudyFormData(mapStudyToRequest(data));
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
                        updateAction?.mutate({ study: studyFormData, id: data.id }, {
                          onSuccess: () => handleClose(),
                        });
                      } else {
                        createAction?.mutate(studyFormData, {
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
                <label htmlFor='subject' className="mr-2">Subject:</label>
                <Select
                    id="subject"
                    required
                    value={studyFormData.disciplineName}
                    onChange={(event) =>
                        setStudyFormData((prev) => ({
                            ...prev,
                            disciplineName: event.target.value
                        }))
                    }
                    sx={{width: 'full-width'}}
                >
                    <MenuItem value={""}>None</MenuItem>
                    {subjects?.map((subject) => (
                        <MenuItem key={subject.name} value={subject.name}>
                            {subject.name}
                        </MenuItem>
                    ))}
                </Select>
            </span>
            <span className='flex flex-col gap-2'>
                <label htmlFor='topic' className="mr-2">Topic:</label>
                <Select
                    id="topic"
                    required
                    value={studyFormData.topicName ?? ""}
                    onChange={(event) =>
                        setStudyFormData((prev) => ({
                            ...prev,
                            topicName: event.target.value
                        }))
                    }
                    sx={{ width: "100%" }}
                >
                    <MenuItem value={""}>None</MenuItem>
                    {subjects?.map((subject) =>
                        subject.name === studyFormData.disciplineName
                            ? subject.topics?.map((topic) => (
                                <MenuItem key={topic.id} value={topic.name}>
                                    {topic.name}
                                </MenuItem>
                            ))
                            : null
                    )}
                </Select>
            </span>
            <span className="flex flex-col gap-2">
                <label className="mr-2">
                    Study date:
                </label>
                <DateInput 
                    key={studyFormData.date} 
                    value={studyFormData.date}
                    onChangeFunc={(newValue) => {
                        setStudyFormData((prev) => ({ ...prev, date: formatSavedDate(newValue) || "" }));
                    }}
                />
            </span>
            <span className="flex flex-col gap-2">
                <label htmlFor="time" className="mr-2">
                    Time:
                </label>
                <TimeInput 
                    id='time'
                    value={studyFormData.time}
                    format='HH:mm'
                    onChangeFunc={(value) => setStudyFormData((prev) => ({
                        ...prev,
                        time: value ? dayjs(value).format("HH:mm") : "00:00", 
                    }))}
                />
            </span>
            <span className="flex flex-row gap-2 items-center">
                <Checkbox 
                    id='isCompleted' 
                    color="primary" 
                    checked={studyFormData.isCompleted} 
                    onChange={(event) =>
                        setStudyFormData((prev) => ({
                            ...prev,
                            isCompleted: event.target.checked
                        }))
                    }
                    size="small"
                    sx={{ padding: 0 }}
                />
                <label htmlFor="isCompleted" className="mr-2">
                    Complete study
                </label>
            </span>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} style='!bg-transparent !text-red-500'>Cancel</Button>
                <Button type="submit">{submitText}</Button>
            </DialogActions>
        </Dialog>
    );
};