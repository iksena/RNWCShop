import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import NavigationStacks from './app/Navigations';

export default function App(): JSX.Element {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <NavigationStacks />
      </NavigationContainer>
    </SafeAreaView>
  );
}
