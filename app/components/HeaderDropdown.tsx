// components/HeaderDropdown.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import { RootStackParamList } from '../navigation';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const HeaderDropdown = () => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const { setUser, profileComplete } = useAuth();

  const handleNavigate = (screen: keyof RootStackParamList) => {
    setVisible(false);

    if ((screen === 'Swipe' || screen === 'Saved') && !profileComplete) {
      Alert.alert(
        'Complete Your Profile',
        'Please finish setting up your profile before using this feature.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Go to Profile', onPress: () => navigation.navigate('Profile') },
        ]
      );
      return;
    }

    navigation.navigate(screen);
  };

  const handleLogout = () => {
    setVisible(false);
    setUser(null);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setVisible(true)} style={styles.icon}>
        <Text style={styles.iconText}>☰</Text>
      </TouchableOpacity>

      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.fullscreenOverlay}>
          <View style={styles.dropdownLarge}>
            {[
              { label: 'Home', screen: 'Home' },
              { label: 'Swipe', screen: 'Swipe' },
              { label: 'Saved', screen: 'Saved' },
              { label: 'Settings', screen: 'Settings' },
              { label: 'Profile', screen: 'Profile' },
            ].map((item, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => handleNavigate(item.screen as keyof RootStackParamList)}
                style={styles.largeItem}
              >
                <Text style={styles.largeItemText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={handleLogout} style={styles.largeItem}>
              <Text style={[styles.largeItemText, styles.logoutText]}>Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeText}>Close ✕</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    padding: 12,
    zIndex: 10,
  },
  iconText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#333',
  },
  fullscreenOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownLarge: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 25,
    width: '90%',
    maxHeight: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeItem: {
    paddingVertical: 18,
    width: '100%',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  largeItemText: {
    fontSize: 22,
    fontWeight: '500',
    color: '#333',
  },
  logoutText: {
    color: '#d9534f',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  closeText: {
    fontSize: 16,
    color: '#555',
  },
});

export default HeaderDropdown;