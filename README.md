# Timer Management App

A React Native app for creating, managing, and interacting with multiple customizable timers. Timers can be grouped by category, visualized with progress bars, and managed individually or in bulk. Timer history and halfway alerts are also supported.

## Features

- Add, start, pause, reset, and complete timers
- Group timers by category (expand/collapse)
- Bulk actions for all timers in a category
- Progress visualization for each timer
- Timer completion modal and halfway alerts
- Timer history log (view on separate screen)
- Persistent storage using AsyncStorage
- Clean UI/UX with minimal dependencies

## Screens

- **Home Screen**: View, group, and manage timers
- **History Screen**: View log of completed timers

## Getting Started

### Prerequisites
- Node.js
- npm or yarn
- Android Studio (for Android) or Xcode (for iOS)
- React Native CLI

### Installation
1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd timer-management-app
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Set up your Android/iOS environment:
   - For Android: Ensure ANDROID_HOME is set and SDK is installed
   - For iOS: Install CocoaPods and run `cd ios && pod install`

### Running the App
- **Android**:
  ```sh
  npx react-native run-android
  ```
- **iOS**:
  ```sh
  npx react-native run-ios
  ```

## Project Structure
- `src/components/` - UI components (CategoryGroup, TimerItem, etc.)
- `src/screens/` - App screens (HomeScreen, HistoryScreen)
- `src/types/` - TypeScript types
- `src/utils/` - Utility functions (storage, timer logic)

