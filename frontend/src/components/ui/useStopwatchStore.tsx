import { create } from 'zustand';

interface StopwatchState {
  time: number;
  setTime: (newTime: number) => void;

  isRunning: boolean;
  setIsRunning: (runningState: boolean) => void;

  intervalRef: NodeJS.Timeout | null;
  setIntervalRef: (newIntervalRef: NodeJS.Timeout | null) => void;

  startStopwatch: () => void;
  stopStopwatch: () => void;
  resetStopwatch: () => void;
}

export const useStopwatchStore = create<StopwatchState>((set, get) => ({
  time: 0,
  setTime: (newTime: number) => set({ time: newTime }),

  isRunning: false,
  setIsRunning: (runningState: boolean) => set({ isRunning: runningState }),

  intervalRef: null,
  setIntervalRef: (newIntervalRef: NodeJS.Timeout | null) => set({ intervalRef: newIntervalRef }),

  startStopwatch: () => {
    const { time, intervalRef, setIsRunning, setTime, setIntervalRef } = get();
    if (!intervalRef) {
      const startTime = Date.now() - time;
      const newInterval = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 1000);
      setIntervalRef(newInterval);
      setIsRunning(true);
    }
  },

  stopStopwatch: () => {
    const { intervalRef, setIsRunning, setIntervalRef } = get();
    if (intervalRef) {
      clearInterval(intervalRef);
      setIntervalRef(null);
      setIsRunning(false);
    }
  },

  resetStopwatch: () => {
    const { setTime, stopStopwatch } = get();
    stopStopwatch();
    setTime(0);
  },
}));
