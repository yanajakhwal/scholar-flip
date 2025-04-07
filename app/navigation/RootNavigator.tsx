// navigation/RootNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

export default function RootNavigator() {
  const { user, profileComplete } = useAuth();

  const isLoggedIn = !!user;
  const isProfileComplete = profileComplete;

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        isProfileComplete ? <AppStack /> : <AuthStack initialRoute="Profile" />
      ) : (
        <AuthStack initialRoute="LoginSignup" />
      )}
    </NavigationContainer>
  );
}