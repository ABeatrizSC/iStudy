"use client"

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { Button } from "../Button";
import { useState } from "react";

interface PomoConfigModalProps {
    config: PomoConfig,
    open: boolean;
    isRunning: boolean;
    action: (configs: PomoConfig) => void;
    handleClose: () => void;
}

interface PomoConfig {
    minutes: number,
    shortBreak: number,
    longBreak: number
}

export const PomoConfigModal: React.FC<PomoConfigModalProps> = ({ config, isRunning, action, open, handleClose }) => {
    const [minutes, setMinutes] = useState<number>(config.minutes);
    const [shortBreak, setShortBreak] = useState<number>(config.shortBreak);
    const [longBreak, setLongBreak] = useState<number>(config.longBreak);

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
                        action({minutes, shortBreak, longBreak});
                        handleClose();
                    }                
                },
            }}
        >
            <DialogTitle textAlign={'center'} textTransform={'uppercase'}>
                Settings
            </DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                 <DialogContentText id="alert-dialog-description" textAlign={'center'}>
                    You can only change Pomodoro settings when time is paused.
                </DialogContentText>
                <span className="flex flex-col gap-2">
                    <TextField
                        type="number"
                        label="Minutes"
                        variant="outlined"
                        value={minutes}
                        onChange={(e) => setMinutes(Number(e.target.value))}
                        disabled={isRunning}
                        InputProps={{
                            inputProps: {
                                min: 0,
                                max: 59,
                                style: { MozAppearance: 'textfield' as any },
                            },
                            sx: {
                                '& input[type=number]': {
                                MozAppearance: 'textfield',
                                },
                                '& input[type=number]::-webkit-outer-spin-button': {
                                WebkitAppearance: 'none',
                                margin: 0,
                                },
                                '& input[type=number]::-webkit-inner-spin-button': {
                                WebkitAppearance: 'none',
                                margin: 0,
                                },
                            }
                        }}
                        fullWidth
                    />
                </span>
                <span className="flex flex-col gap-2">
                    <TextField
                        type="number"
                        label="Short Break"
                        variant="outlined"
                        value={shortBreak}
                        onChange={(e) => setShortBreak(Number(e.target.value))}
                        disabled={isRunning}
                        InputProps={{
                            inputProps: {
                                min: 0,
                                max: 59,
                                style: { MozAppearance: 'textfield' as any },
                            },
                            sx: {
                                '& input[type=number]': {
                                MozAppearance: 'textfield',
                                },
                                '& input[type=number]::-webkit-outer-spin-button': {
                                WebkitAppearance: 'none',
                                margin: 0,
                                },
                                '& input[type=number]::-webkit-inner-spin-button': {
                                WebkitAppearance: 'none',
                                margin: 0,
                                },
                            }
                        }}
                        fullWidth
                    />
                </span>
                <span className="flex flex-col gap-2">
                    <TextField
                        type="number"
                        label="Long Break"
                        variant="outlined"
                        value={longBreak}
                        onChange={(e) => setLongBreak(Number(e.target.value))}
                        disabled={isRunning}
                        InputProps={{
                            inputProps: {
                                min: 0,
                                max: 59,
                                style: { MozAppearance: 'textfield' as any },
                            },
                            sx: {
                                '& input[type=number]': {
                                MozAppearance: 'textfield',
                                },
                                '& input[type=number]::-webkit-outer-spin-button': {
                                WebkitAppearance: 'none',
                                margin: 0,
                                },
                                '& input[type=number]::-webkit-inner-spin-button': {
                                WebkitAppearance: 'none',
                                margin: 0,
                                },
                            }
                        }}
                        fullWidth
                    />
                </span>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} style='!bg-transparent !text-red-500'>Cancel</Button>
                <Button type="submit">Save</Button>
            </DialogActions>
        </Dialog>
    )
}