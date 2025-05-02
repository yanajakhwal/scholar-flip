import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, Image, TouchableOpacity,
  Keyboard, TouchableWithoutFeedback, Dimensions, TextInputProps, KeyboardTypeOptions
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { useProfile } from '../context/ProfileContext';

const { width, height } = Dimensions.get('window');

const ProfileScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Profile'>>();
  const { profile, setProfile } = useProfile();

  const [user, setUser] = useState(profile.user);
  const [phone, setPhone] = useState(profile.phone);
  const [gender, setGender] = useState(profile.gender);
  const [dob, setDob] = useState(profile.dob);
  const [profileImage, setProfileImage] = useState<string | null>(profile.profileImage);

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

  const handleNext = () => {
    setProfile({
      user,
      phone,
      gender,
      dob,
      profileImage,
    });
    navigation.navigate('ScholarshipInfo');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient colors={['#AFC8E8', '#FAD6A5', '#FF9A8B']} style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.heading}>Complete Your Profile</Text>

          <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <Image source={require('../assets/profile-img.png')} style={styles.profileImage} />
            )}
          </TouchableOpacity>

          <View style={styles.detailsContainer}>
            <Input label="Username" value={user} onChange={setUser} />
            <Input label="Phone" value={phone} onChange={setPhone} keyboardType="phone-pad" />
            <Input label="Gender" value={gender} onChange={setGender} />
            <Input label="Date of Birth" value={dob} onChange={setDob} keyboardType="numeric" />
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{profile.email}</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>NEXT ➜</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

type InputProps = {
  label: string;
  value: string;
  onChange: (val: string) => void;
  keyboardType?: KeyboardTypeOptions;
};

const Input = ({ label, value, onChange, keyboardType }: InputProps) => (
  <View style={{ width: '100%', marginBottom: 15 }}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChange}
      placeholder={label}
      keyboardType={keyboardType}
    />
  </View>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  imageContainer: {
    width: 130,
    height: 130,
    borderRadius: 65,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#ccc',
    marginBottom: 30,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    width: width * 0.85,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 6,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: width * 0.85,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;