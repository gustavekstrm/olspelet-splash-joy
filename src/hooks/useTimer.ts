
import { useState, useEffect, useCallback } from 'react';

export const useTimer = (initialTime: number = 7) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const startTimer = useCallback(() => {
    setTimeLeft(initialTime);
    setIsActive(true);
    setIsFinished(false);
  }, [initialTime]);

  const resetTimer = useCallback(() => {
    setTimeLeft(initialTime);
    setIsActive(false);
    setIsFinished(false);
  }, [initialTime]);

  const pauseTimer = useCallback(() => {
    setIsActive(false);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setIsFinished(true);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  return {
    timeLeft,
    isActive,
    isFinished,
    startTimer,
    resetTimer,
    pauseTimer
  };
};
