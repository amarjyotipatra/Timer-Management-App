import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Timer } from '../types/timer';
import { formatTime, calculateProgress } from '../utils/timerUtils';

interface TimerItemProps {
  timer: Timer;
  onStart: (id: string) => void;
  onPause: (id: string) => void;
  onReset: (id: string) => void;
}

const TimerItem: React.FC<TimerItemProps> = ({ timer, onStart, onPause, onReset }) => {
  const progress = calculateProgress(timer);
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{timer.name}</Text>
        <Text style={[styles.status, 
          timer.status === 'running' ? styles.statusRunning : 
          timer.status === 'paused' ? styles.statusPaused : 
          styles.statusCompleted
        ]}>
          {timer.status.toUpperCase()}
        </Text>
      </View>
      
      <Text style={styles.time}>{formatTime(timer.remainingTime)}</Text>
      
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
      
      <View style={styles.controls}>
        {timer.status !== 'completed' && (
          <>
            {timer.status === 'running' ? (
              <TouchableOpacity 
                style={styles.button} 
                onPress={() => onPause(timer.id)}
              >
                <Text style={styles.buttonText}>Pause</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                style={styles.button} 
                onPress={() => onStart(timer.id)}
              >
                <Text style={styles.buttonText}>Start</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => onReset(timer.id)}
            >
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </>
        )}
        
        {timer.status === 'completed' && (
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => onReset(timer.id)}
          >
            <Text style={styles.buttonText}>Start Again</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  statusRunning: {
    backgroundColor: '#4CAF50',
    color: 'white',
  },
  statusPaused: {
    backgroundColor: '#FFC107',
    color: 'black',
  },
  statusCompleted: {
    backgroundColor: '#2196F3',
    color: 'white',
  },
  time: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 10,
  },
  progressContainer: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginVertical: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TimerItem;