// screens/HomeScreen.tsx
import React from 'react';
import HeaderDropdown from '../components/HeaderDropdown';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = () => {
  return (

    <TouchableOpacity 
      style={styles.fullScreenTouch} 
      onPress={() => console.log("on the home screeeen")}
      activeOpacity={1} 
    >
      <LinearGradient colors={['#AFC8E8', '#FAD6A5', '#FF9A8B']} style={styles.background}>
        <View style={styles.dropdownWrapper}>
          <HeaderDropdown/>
        </View>

        <View style={styles.centerContent}>
          <Text style={styles.title}>Home</Text>
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
  dropdownWrapper: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',   // center vertically
    alignItems: 'center',       // center horizontally
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'AfacadRegular',
  },
});

export default HomeScreen;