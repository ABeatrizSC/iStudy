'use client';

import React, { useState, useEffect, useRef } from "react";
import { Box, CircularProgress, TextField } from "@mui/material";
import { PlayArrow, Pause, RestartAlt } from "@mui/icons-material";
import { Container, Button } from "./";
import { useNotification } from "@/hooks/notification";

export const CountdownTimer: React.FC = () => {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [initialTime, setInitialTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const notification = useNotification();

  const playAlertSound = () => {
    const audio = new Audio("./timerAlert.mp3");
    audio.play();
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      clearInterval(intervalRef.current!);
      setIsRunning(false);
      playAlertSound();
      setInitialTime(0);
      notification.notify("Time completed", "success")
    }
    return () => clearInterval(intervalRef.current!);
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    const totalSeconds = hours * 3600 + minutes * 60;
    setTimeLeft(totalSeconds);
    setInitialTime(totalSeconds);
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
    setTimeLeft(0);
    setInitialTime(0); 
    setIsRunning(false);
    setHours(0);
    setMinutes(0);
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  const progress = initialTime > 0 ? ((initialTime - timeLeft) / initialTime) * 100 : 0;

  return (
    <Container style="min-h-full justify-center">
      <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
        <div className="flex flex-wrap gap-4 w-full">
          <TextField
            type="number"
            label="Hours"
            variant="outlined"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            disabled={isRunning || timeLeft > 0}
            sx={{ flexGrow: 1, minWidth: '100px' }}
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
          />

          <TextField
            type="number"
            label="Minutes"
            variant="outlined"
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            disabled={isRunning || timeLeft > 0}
            sx={{ flexGrow: 1, minWidth: '100px' }}
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
          />
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
              value={progress}
              size={250}
              thickness={2}
              sx={{
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
        </div>

        <div className="flex gap-4 flex-wrap justify-center">
          {!isRunning && timeLeft === 0 && (
            <Button
              onClick={handleStart}
              disabled={hours === 0 && minutes === 0}
            >
              <PlayArrow />
              Start
            </Button>
          )}

          {!isRunning && timeLeft > 0 && (
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
        </div>
      </div>
    </Container>
  );
}