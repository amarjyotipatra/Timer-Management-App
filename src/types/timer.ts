export type TimerStatus = 'running' | 'paused' | 'completed';

export interface Timer {
  id: string;
  name: string;
  duration: number; // Total duration in seconds
  category: string;
  remainingTime: number; // Current remaining time in seconds
  status: TimerStatus;
  createdAt: number; // timestamp
  halfwayAlert?: boolean; // Optional halfway alert
  halfwayAlertTriggered?: boolean; // Track if halfway alert has been triggered
}

export interface TimerLog {
  id: string;
  timerName: string;
  category: string;
  completedAt: number; // timestamp of completion
  duration: number; // Total duration the timer was set for
}

export interface TimersByCategory {
  [category: string]: Timer[];
}
