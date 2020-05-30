import React from 'react';
import { createStore } from 'redux';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import NavigationStacks from './app/Navigations';
import cartReducer from './app/Reducers/Cart.reducer';

export default function App(): JSX.Element {
  return (
    <Provider store={createStore(cartReducer)}>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <NavigationStacks />
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}
