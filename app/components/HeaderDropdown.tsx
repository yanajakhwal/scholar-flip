// componenys/HeaderDropdown.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import { RootStackParamList } from '../navigation'; // or '../navigation/navigationTypes'

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
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setVisible(false)}
        >
          <View style={styles.dropdown}>
            <TouchableOpacity onPress={() => handleNavigate('Home')} style={styles.item}>
              <Text>🏠 Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigate('Swipe')} style={styles.item}>
              <Text>🎓 Swipe</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigate('Saved')} style={styles.item}>
              <Text>💾 Saved</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigate('Settings')} style={styles.item}>
              <Text>⚙️ Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigate('Profile')} style={styles.item}>
              <Text>👤 Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={styles.item}>
              <Text>🚪 Logout</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    padding: 10,
    zIndex: 10,
  },
  iconText: {
    fontSize: 24,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 60,
    paddingRight: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    elevation: 4,
    width: 170,
  },
  item: {
    paddingVertical: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
  },
});

export default HeaderDropdown;