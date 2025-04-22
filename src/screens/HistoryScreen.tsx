import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { loadTimerLogs } from '../utils/storage';
import { TimerLog } from '../types/timer';
import { HistoryScreenProps } from '../types/navigation';

const HistoryScreen: React.FC<HistoryScreenProps> = () => {
  const [logs, setLogs] = useState<TimerLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const timerLogs = await loadTimerLogs();
        setLogs(timerLogs);
      } catch (error) {
        console.error('Failed to load timer logs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text>Loading history...</Text>
      </View>
    );
  }

  if (logs.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No timer history found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={logs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.logItem}>
            <Text style={styles.logTitle}>{item.timerName}</Text>
            <Text>Duration: {Math.floor(item.duration / 60)}m {item.duration % 60}s</Text>
            <Text>Completed: {formatDate(item.completedAt)}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  logTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default HistoryScreen;