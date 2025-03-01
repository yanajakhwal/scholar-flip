import React from 'react';
import RootNavigator from './navigation/RootNavigator';
import { StyleSheet } from 'react-native';

export default function App() {
  return <RootNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
