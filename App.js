import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import AuthNavigation from './src/navigation/AuthNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Text } from 'react-native';

export default function App() {
  return (
      <View>
      <Text>This is text inside a View</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
