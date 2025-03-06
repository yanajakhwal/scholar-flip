import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginSignupScreen from '../screens/LoginSignupScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  Welcome: undefined;
  Login_Signup: undefined;
  Profile: undefined;
};

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#FAF9F6' }, 
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login_Signup" component={LoginSignupScreen} /> 
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}