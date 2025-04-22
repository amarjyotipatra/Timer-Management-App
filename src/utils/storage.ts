import AsyncStorage from '@react-native-async-storage/async-storage';
import { Timer, TimerLog } from '../types/timer';

const TIMERS_STORAGE_KEY = '@timers_app_data';
const TIMER_LOGS_STORAGE_KEY = '@timers_app_logs';

// Save timers to AsyncStorage
export const saveTimers = async (timers: Timer[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(TIMERS_STORAGE_KEY, JSON.stringify(timers));
  } catch (error) {
    console.error('Error saving timers:', error);
    throw error;
  }
};

// Load timers from AsyncStorage
export const loadTimers = async (): Promise<Timer[]> => {
  try {
    const timersJson = await AsyncStorage.getItem(TIMERS_STORAGE_KEY);
    return timersJson ? JSON.parse(timersJson) : [];
  } catch (error) {
    console.error('Error loading timers:', error);
    return [];
  }
};

// Save timer logs to AsyncStorage
export const saveTimerLogs = async (logs: TimerLog[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(TIMER_LOGS_STORAGE_KEY, JSON.stringify(logs));
  } catch (error) {
    console.error('Error saving timer logs:', error);
    throw error;
  }
};

// Load timer logs from AsyncStorage
export const loadTimerLogs = async (): Promise<TimerLog[]> => {
  try {
    const logsJson = await AsyncStorage.getItem(TIMER_LOGS_STORAGE_KEY);
    return logsJson ? JSON.parse(logsJson) : [];
  } catch (error) {
    console.error('Error loading timer logs:', error);
    return [];
  }
};

// Add a timer log
export const addTimerLog = async (log: TimerLog): Promise<void> => {
  const logs = await loadTimerLogs();
  logs.unshift(log); // Add to beginning for chronological order
  await saveTimerLogs(logs);
};

// Clear all storage (for testing/debugging)
export const clearStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([TIMERS_STORAGE_KEY, TIMER_LOGS_STORAGE_KEY]);
  } catch (error) {
    console.error('Error clearing storage:', error);
    throw error;
  }
};

// Export timer logs as JSON string
export const exportTimerLogs = async (): Promise<string> => {
  const logs = await loadTimerLogs();
  return JSON.stringify(logs, null, 2); // Prettify JSON for export
};