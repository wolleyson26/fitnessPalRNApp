 
import * as React from 'react'; 
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'; 
import RootNavigator from "./navigator/RootNavigator"; 
import { StatusBar } from "expo-status-bar";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

function App() {

  return (
    <NavigationContainer theme={MyTheme}>   
        <RootNavigator />  
        <StatusBar style='auto' />
    </NavigationContainer>
  );
}

export default App;