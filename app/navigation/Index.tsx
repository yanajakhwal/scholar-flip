// navigation/index.ts
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginSignupScreen from '../screens/LoginSignupScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import SwipeScreen from '../screens/SwipeScreen';
import SavedScreen from '../screens/SavedScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ScholarshipInfo from '../screens/ScholarshipInfo'; // adjust path as needed

export type RootStackParamList = {
  Welcome: undefined;
  LoginSignup: undefined;
  Profile: undefined;
  ScholarshipInfo: undefined;
  Home: undefined;
  Swipe: undefined;
  Saved: undefined;
  Settings: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { user } = useAuth(); // only checking if they're logged in

  const isLoggedIn = !!user;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="LoginSignup" component={LoginSignupScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Swipe" component={SwipeScreen} />
            <Stack.Screen name="Saved" component={SavedScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="ScholarshipInfo" component={ScholarshipInfo} options={{ title: 'Scholarship Info' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}