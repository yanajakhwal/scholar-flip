import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/Index';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;

const SettingsScreen = () => {
  const navigation = useNavigation<NavigationProp>(); 

  return (
    <TouchableOpacity 
      style={styles.fullScreenTouch} 
    //   onPress={() => navigation.navigate('LoginSignup')} 
      activeOpacity={1} 
    >
      <LinearGradient colors={['#AFC8E8', '#FAD6A5', '#FF9A8B']} style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.title}>ScholarFlip</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  fullScreenTouch: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'AfacadRegular',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'AfacadBold',
    opacity: 0.8,
  },
});

export default SettingsScreen;