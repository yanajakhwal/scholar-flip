import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from '../screens/WelcomeScreen';
import ProfileSetup from '../screens/ProfileSetup';

const Stack = createStackNavigator();

export type RootStackParamList = {
    Welcome: undefined;
    ProfileSetup: undefined;
  };

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#FAF9F6' }, // ✅ Change global background color
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
