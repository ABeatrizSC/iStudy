'use client'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Input, MenuItem, Select } from '@mui/material';
import { Button } from '../';
import { useEffect, useState } from 'react';
import { Subject, SubjectRequest } from '@/resources/services/subject/subject.resource';
import { UseMutationResult } from '@tanstack/react-query';
import { formatCategory } from '@/utils/formatters';

interface SubjectModalProps {
    title: string;
    submitText: string;
    categoriesList?: string[],
    data?: Subject,
    createAction?: UseMutationResult<Subject[], Error, SubjectRequest, unknown>;
    updateAction?: UseMutationResult<Subject[], Error, { subject: SubjectRequest; id: string }, unknown>;
    open: boolean;
    handleClose: () => void;
}

export const SubjectModal: React.FC<SubjectModalProps> = ({ title, submitText, categoriesList, data, createAction, updateAction, open, handleClose }) => {
    const [subjectData, setSubjectData] = useState<SubjectRequest>({ name: data?.name ?? "", category: data?.category ?? null});

    useEffect(() => {
        if (open) {
            setSubjectData(data || { name: "", category: null });
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
                    const updatedData = {
                      ...subjectData,
                      category: subjectData.category === "" ? null : subjectData.category,
                    };
                    
                    if (data?.id) {
                      updateAction?.mutate({ subject: updatedData, id: data.id }, {
                        onSuccess: () => handleClose(),
                      });
                    } else {
                      createAction?.mutate(updatedData, {
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
                <label htmlFor='subjectName' className="mr-2">Name:</label>
                <Input 
                    id="subjectName"
                    placeholder="Subject name" 
                    fullWidth={true} 
                    value={subjectData?.name ?? ""}
                    required
                    onChange={(event) =>
                        setSubjectData((prev) => ({
                            category: prev?.category,
                            name: event.target.value,
                        }))
                    }
                    sx={{
                        minWidth: 'full-width',
                    }}
                />
            </span>
            <span className='flex flex-col gap-2'>
                <label htmlFor='category' className="mr-2">Category:</label>
                <Select
                    id="category"
                    required
                    value={subjectData?.category ?? ""}
                    onChange={(event) =>
                        setSubjectData((prev) => ({
                            name: prev?.name || "",
                            category: event.target.value,
                        }))
                    }
                    sx={{width: 'full-width'}}
                >
                    <MenuItem value={""}>None</MenuItem>
                    {categoriesList?.map((category) => (
                        <MenuItem key={category} value={category}>
                            {formatCategory(category)}
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