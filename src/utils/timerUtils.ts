import { Timer, TimersByCategory } from '../types/timer';

// Format seconds to MM:SS display
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Calculate progress percentage
export const calculateProgress = (timer: Timer): number => {
  if (timer.duration === 0) return 0;
  return ((timer.duration - timer.remainingTime) / timer.duration) * 100;
};

// Group timers by category
export const groupTimersByCategory = (timers: Timer[]): TimersByCategory => {
  return timers.reduce((grouped, timer) => {
    const category = timer.category;
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(timer);
    return grouped;
  }, {} as TimersByCategory);
};

// Generate a unique ID for timers
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};