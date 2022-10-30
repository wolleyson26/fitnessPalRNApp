import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import SignupScreen from "../screens/SignupScreen";
import SigninScreen from "../screens/SigninScreen"; 
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen"; 

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator> 
        <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Signup" component={SignupScreen}  options={{
          headerShown: false, 
          animationTypeForReplace: 'push',
          animation:'slide_from_right'
        }}/> 
        <Stack.Screen name="Signin" component={SigninScreen} options={{
            headerShown: false, 
            animationTypeForReplace: 'push',
            animation:'slide_from_left'
        }}/> 
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{
            headerShown: false, 
            animationTypeForReplace: 'push',
        }}/>
    </Stack.Navigator>
  );
};

export default RootNavigator;
