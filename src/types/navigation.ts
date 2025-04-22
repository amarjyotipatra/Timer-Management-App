import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined; // No parameters expected for Home screen
  History: undefined; // No parameters expected for History screen
  // Add other screens and their parameters here if needed
};

// Define prop types for each screen
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type HistoryScreenProps = NativeStackScreenProps<RootStackParamList, 'History'>;
