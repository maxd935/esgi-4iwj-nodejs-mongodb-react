import React from 'react';
import Ecommerce from './components/Cart';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider, DarkTheme} from 'react-native-paper';

function App() {
  return (
    <PaperProvider theme={{...DarkTheme, dark: true}}>
      <NavigationContainer theme={{...DarkTheme, dark: true}}>
        <Ecommerce />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
