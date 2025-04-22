import React, { useEffect, useState } from 'react';
import { View, Text, SectionList, StyleSheet, Button, Alert } from 'react-native';
import { loadTimers, saveTimers, loadTimerLogs, saveTimerLogs } from '../utils/storage';
import { Timer, TimersByCategory, TimerStatus, TimerLog } from '../types/timer';
import CategoryGroup from '../components/CategoryGroup';
import { HomeScreenProps } from '../types/navigation';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  // Placeholder state and effect for initial scaffold
  const [timersByCategory, setTimersByCategory] = useState<TimersByCategory>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load timers from storage (scaffold)
    const fetchTimers = async () => {
      setLoading(true);
      try {
        const timers = await loadTimers();
        // Group timers by category (scaffold)
        const grouped: TimersByCategory = {};
        timers.forEach(timer => {
          if (!grouped[timer.category]) grouped[timer.category] = [];
          grouped[timer.category].push(timer);
        });
        setTimersByCategory(grouped);
      } catch (e) {
        // Handle error
      } finally {
        setLoading(false);
      }
    };
    fetchTimers();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text>Loading timers...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button title="Go to History" onPress={() => navigation.navigate('History')} />
      {/* Render grouped timers (scaffold) */}
      {Object.keys(timersByCategory).length === 0 ? (
        <Text>No timers found. Add a timer to get started.</Text>
      ) : (
        Object.entries(timersByCategory).map(([category, timers]) => (
          <CategoryGroup key={category} category={category} timers={timers} />
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
