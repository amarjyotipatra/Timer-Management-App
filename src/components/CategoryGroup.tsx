import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Timer } from '../types/timer';
import TimerItem from './TimerItem';

interface CategoryGroupProps {
  category: string;
  timers: Timer[];
  onStartTimer: (id: string) => void;
  onPauseTimer: (id: string) => void;
  onResetTimer: (id: string) => void;
  onStartAllInCategory: (category: string) => void;
  onPauseAllInCategory: (category: string) => void;
  onResetAllInCategory: (category: string) => void;
}

const CategoryGroup: React.FC<CategoryGroupProps> = ({
  category,
  timers,
  onStartTimer,
  onPauseTimer,
  onResetTimer,
  onStartAllInCategory,
  onPauseAllInCategory,
  onResetAllInCategory,
}) => {
  const [expanded, setExpanded] = useState(true);

  // Count timers by status
  const runningCount = timers.filter(timer => timer.status === 'running').length;
  const pausedCount = timers.filter(timer => timer.status === 'paused').length;
  const completedCount = timers.filter(timer => timer.status === 'completed').length;

  return (
    <View style={styles.container}>
      {/* Category Header with collapse/expand functionality */}
      <TouchableOpacity
        style={styles.categoryHeader}
        onPress={() => setExpanded(!expanded)}
      >
        <View style={styles.categoryTitleContainer}>
          <Text style={styles.categoryTitle}>{category}</Text>
          <Text style={styles.timerCount}>
            {timers.length} timer{timers.length !== 1 ? 's' : ''}
            {runningCount > 0 && ` (${runningCount} running)`}
          </Text>
        </View>
        <Text style={styles.expandCollapseIcon}>
          {expanded ? '▼' : '►'}
        </Text>
      </TouchableOpacity>

      {/* Bulk Actions for Category */}
      <View style={styles.bulkActions}>
        <TouchableOpacity 
          style={styles.bulkActionButton} 
          onPress={() => onStartAllInCategory(category)}
        >
          <Text style={styles.buttonText}>Start All</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.bulkActionButton} 
          onPress={() => onPauseAllInCategory(category)}
        >
          <Text style={styles.buttonText}>Pause All</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.bulkActionButton} 
          onPress={() => onResetAllInCategory(category)}
        >
          <Text style={styles.buttonText}>Reset All</Text>
        </TouchableOpacity>
      </View>

      {/* Timer Items in this category */}
      {expanded && (
        <View style={styles.timerList}>
          {timers.map((timer) => (
            <TimerItem
              key={timer.id}
              timer={timer}
              onStart={onStartTimer}
              onPause={onPauseTimer}
              onReset={onResetTimer}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#3f51b5',
  },
  categoryTitleContainer: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  timerCount: {
    color: '#e0e0e0',
    fontSize: 14,
    marginTop: 2,
  },
  expandCollapseIcon: {
    fontSize: 16,
    color: 'white',
  },
  bulkActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  bulkActionButton: {
    backgroundColor: '#3f51b5',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  timerList: {
    padding: 8,
  },
});

export default CategoryGroup;