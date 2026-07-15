import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import CollegeCornerScreen from './src/screens/Collegecornerscreen';
import RORScreen from './src/screens/ROR';
import PastYearPapersScreen from './src/screens/Past Year Papers';
import FlagsScreen from './src/screens/Flags';
import MorseCodeScreen from './src/screens/morsecode';
import FreeTrialScreen from './src/screens/Freetrailscreen';
import SSTPScreen from './src/screens/SSTP';
import OnboardFamiliarizationScreen from './src/screens/OnboardScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.appRoot}>
      <SafeAreaProvider style={styles.appRoot}>
        <StatusBar barStyle="dark-content" backgroundColor="#F4F7FC" />

        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="CollegeCorner"
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
              contentStyle: styles.appRoot,
            }}
          >
            <Stack.Screen name="CollegeCorner" component={CollegeCornerScreen} />
            <Stack.Screen name="ROR" component={RORScreen} />
            <Stack.Screen name="PastYearPapers" component={PastYearPapersScreen} />
            <Stack.Screen name="Flags" component={FlagsScreen} />
            <Stack.Screen name="MorseCode" component={MorseCodeScreen} />
            <Stack.Screen name="FreeTrial" component={FreeTrialScreen} />
            <Stack.Screen name="SSTP" component={SSTPScreen} />
            <Stack.Screen
              name="OnboardFamiliarization"
              component={OnboardFamiliarizationScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  appRoot: {
    flex: 1,
    backgroundColor: '#F4F7FC',
    ...(Platform.OS === 'web' ? { minHeight: '100vh' } : null),
  },
});
