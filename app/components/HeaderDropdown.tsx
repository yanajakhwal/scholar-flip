// components/HeaderDropdown.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

const HeaderDropdown = () => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const { setUser } = useAuth();

  const handleNavigate = (screen: string) => {
    setVisible(false);
    // @ts-ignore
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
            <TouchableOpacity onPress={() => handleNavigate('Profile')} style={styles.item}>
              <Text>👤 Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigate('Settings')} style={styles.item}>
              <Text>⚙️ Settings</Text>
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
    position: 'absolute',
    top: 50,
    right: 20,
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
    width: 150,
  },
  item: {
    paddingVertical: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
  },
});

export default HeaderDropdown;