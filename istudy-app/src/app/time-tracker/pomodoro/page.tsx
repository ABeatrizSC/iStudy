'use client'

import { Template, Title, Container, Button, ScheduleItemModal, PomoConfigModal } from "@/components"
import { useNotification } from "@/hooks/notification"
import React, { useState, useEffect, useRef } from "react";
import { PlayArrow, Pause, RestartAlt, AccessTime, Timer, HourglassTopRounded } from "@mui/icons-material";
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, CircularProgress, Tab, Tabs } from "@mui/material";

export default function Pomodoro() {
    const [tabIndex, setTabIndex] = useState<number>(0);

    const [pomodoroMin, setPomodoroMin] = useState<number>(25)
    const [shortBreak, setShortBreak] = useState<number>(5)
    const [longBreak, setLongBreak] = useState<number>(15)

    const [timeLeft, setTimeLeft] = useState<number>(pomodoroMin * 60);
    const [round, setRound] = useState<number>(0);
    const [isRunning, setIsRunning] = useState(false);

    const [openConfigModal, setOpenConfigModal] = useState<boolean>(false);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const notification = useNotification();

    const minutes = tabIndex == 0 ? pomodoroMin * 60 : tabIndex == 1 ? shortBreak * 60 : longBreak * 60;

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isRunning) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            setTimeLeft(minutes)
            playAlertSound();
            
            var successMessage = "Time completed!";

            if (tabIndex == 0) {
                const currentRound = round + 1;
                setRound(currentRound);
                
                if (currentRound < 4) {
                    setTabIndex(1);
                } else {
                    setRound(0);
                    setTabIndex(2);
                }
            } else {
                successMessage = "Break time completed!";
                setTabIndex(0);
            }

            notification.notify(successMessage, "success")
        }

        return () => clearInterval(intervalRef.current!);
    }, [isRunning, timeLeft]);

    useEffect(() => {
        setTimeLeft(minutes);
        handlePause();
    }, [tabIndex])


    const handleStart = () => {
        setTimeLeft(minutes);
        setIsRunning(true);
    };

    const handlePause = () => {
        clearInterval(intervalRef.current!);
        setIsRunning(false);
    };

    const handleResume = () => {
        if (timeLeft > 0) {
            setIsRunning(true);
        }
    };

    const handleReset = () => {
        clearInterval(intervalRef.current!);
        setTimeLeft(minutes);
        setIsRunning(false);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
    
        const paddedMins = mins.toString().padStart(2, "0");
        const paddedSecs = secs.toString().padStart(2, "0");
    
        return `${paddedMins}:${paddedSecs}`;
    };  
    
    const playAlertSound = () => {
        const audio = new Audio("./timerAlert.mp3");
        audio.play();
    };

    const handleSettingsChange = (newConfig: { minutes: number; shortBreak: number; longBreak: number }) => {
        setPomodoroMin(newConfig.minutes);
        setShortBreak(newConfig.shortBreak);
        setLongBreak(newConfig.longBreak);
    
        if (!isRunning) {
            const updatedMinutes = tabIndex === 0
                ? newConfig.minutes * 60
                : tabIndex === 1
                ? newConfig.shortBreak * 60
                : newConfig.longBreak * 60;
            setTimeLeft(updatedMinutes);
        }
    };    

    return (
        <Template>
            <Title>
                Pomodoro
            </Title>
            <Container style="justify-center">
                <div className="flex flex-col items-center gap-6 pb-2 w-full">   
                    <div className="w-full">
                        <Tabs 
                            value={tabIndex} 
                            onChange={(_, newValue) => setTabIndex(newValue)} 
                            centered 
                            sx={{ 
                                mt: 2, 
                                mb: 1,
                                minHeight: '48px',
                                '.MuiTabs-indicator': {
                                    height: '3px',
                                },
                                '.MuiTab-root': {
                                    minHeight: '48px',
                                    paddingBottom: '8px',
                                }
                            }}
                        >
                            <Tab icon={<Timer />} iconPosition="start" label="Pomodoro" />
                            <Tab icon={<AccessTime />} iconPosition="start" label="Short Break" />
                            <Tab icon={<HourglassTopRounded />} iconPosition="start" label="Long Break" />
                        </Tabs>
                    </div>

                    <div className="flex flex-col items-center gap-5 my-7">
                        <Box position="relative" display="inline-flex">
                            <CircularProgress
                                variant="determinate"
                                value={100}
                                size={250}
                                thickness={2}
                                sx={{
                                    color: '#e0e0e0',
                                    position: 'absolute',
                                }}
                            />

                            <CircularProgress
                                variant="determinate"
                                value={(1 - timeLeft / minutes) * 100}
                                size={250}
                                thickness={2}
                                sx={{
                                    color: (tabIndex != 0 ? "#e73f5d" : ""),
                                    transition: 'all 0.5s ease-in-out',
                                }}
                            />

                            <Box
                                top={0}
                                left={0}
                                bottom={0}
                                right={0}
                                position="absolute"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                flexDirection="column"
                            >
                                <span className="text-4xl md:text-5xl">{formatTime(timeLeft)}</span>
                            </Box>
                        </Box>

                        <span className="text-gray-400 mt-4">
                            Pomodoros completed: {round}/4
                        </span>
                    </div>

                    <div className="flex gap-4 flex-wrap">
                        {!isRunning && timeLeft == minutes && (
                            <Button
                                onClick={handleStart}
                                disabled={pomodoroMin == 0}
                            >
                                <PlayArrow />
                                Start
                            </Button>
                        )}

                        {!isRunning && timeLeft < minutes && (
                            <Button
                                color="green"
                                onClick={handleResume}
                            >
                                <PlayArrow />
                                Resume
                            </Button>
                        )}

                        {isRunning && (
                            <Button
                            onClick={handlePause}
                            >
                                <Pause />
                                Pause
                            </Button>
                        )}

                        <Button
                            color="red"
                            onClick={handleReset}
                        >
                            <RestartAlt />
                            Reset
                        </Button>
                        <Button
                            color="gray"
                            onClick={() => setOpenConfigModal(true)}
                        >
                            <SettingsIcon />
                        </Button>
                    </div>
                </div>
                <PomoConfigModal 
                    action={handleSettingsChange}
                    config={{minutes: pomodoroMin, shortBreak, longBreak}}
                    handleClose={() => setOpenConfigModal(false)}
                    open={openConfigModal}
                    isRunning={isRunning}
                />
            </Container>
        </Template>
    )
}