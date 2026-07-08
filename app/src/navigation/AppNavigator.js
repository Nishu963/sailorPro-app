import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import Screen1 from '../screens/Screen1';
import Screen2 from '../screens/Screen2';
import Screen3 from '../screens/Screen3';
import Screen4 from '../screens/Screen4';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'MMD Exam Home' }} />
      <Stack.Screen name="Screen1" component={Screen1} options={{ title: 'Screen 1' }} />
      <Stack.Screen name="Screen2" component={Screen2} options={{ title: 'Screen 2' }} />
      <Stack.Screen name="Screen3" component={Screen3} options={{ title: 'Screen 3' }} />
      <Stack.Screen name="Screen4" component={Screen4} options={{ title: 'Screen 4' }} />
    </Stack.Navigator>
  );
}
