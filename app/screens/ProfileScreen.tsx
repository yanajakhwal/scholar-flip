import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  Keyboard, 
  TouchableWithoutFeedback, 
  ScrollView 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
  const [user, setUser] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const email = 'test123@gmail.com'; // hardcoded for now

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <LinearGradient colors={['#AFC8E8', '#FAD6A5', '#FF9A8B']} style={styles.background}>
        <ScrollView contentContainerStyle={styles.container}>
        
        {/* Profile Picture */}
        <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <Image source={require('../assets/profile-img.png')} style={styles.profileImage} />
          )}
        </TouchableOpacity>

         {/* Fields */}
         <View style={styles.detailsContainer}>
            <Text style={styles.label}>Username</Text>
            <TextInput 
              style={styles.input} 
              placeholder="username"
              value={user}
              onChangeText={setUser}
            />

            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{email}</Text>

            <Text style={styles.label}>Phone</Text>
            <TextInput 
              style={styles.input} 
              placeholder="+1 123-456-7890"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />

            <Text style={styles.label}>Gender</Text>
            <TextInput 
              style={styles.input} 
              placeholder="gender"
              value={gender}
              onChangeText={setGender}
            />

            <Text style={styles.label}>Date of birth</Text>
            <TextInput 
              style={styles.input} 
              placeholder="24/12/2005"
              keyboardType="numeric"
              value={dob}
              onChangeText={setDob}
            />
          </View>

          {/* Save Profile Button */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>SAVE INFORMATION</Text>
          </TouchableOpacity>
        </ScrollView>

  
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
    width: '100%', 
    padding: 20,
  },
  profileHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90E2',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 20,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    marginBottom: 20,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  detailsContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    width: '95%', // Increased width for a larger box
    maxWidth: 500, // Increase max width for larger screens
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
    marginTop: 12,
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  button: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '90%',
    maxWidth: 400,
    marginBottom: 30,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: '#E5E5E5',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
  },
});

export default ProfileScreen;