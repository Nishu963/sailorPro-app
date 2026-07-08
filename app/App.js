import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import DgShipping from './src/screens/DgShipping';
import DgProblemSolver from './src/screens/DgProblemSolver';

export default function App() {
  const [screen, setScreen] = useState('DGShipping');

  const navigation = {
    navigate: (name) => setScreen(name),
    goBack: () => setScreen('DGShipping'),
  };

  return (
    <View style={styles.appRoot}>
      <SafeAreaProvider style={styles.appRoot}>
        <StatusBar barStyle="dark-content" backgroundColor="#F4F7FC" />

        {screen === 'DGProblemSolver' ? (
          <DgProblemSolver navigation={navigation} />
        ) : (
          <DgShipping navigation={navigation} />
        )}
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
