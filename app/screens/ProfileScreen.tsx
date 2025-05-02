import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Keyboard, TouchableWithoutFeedback, Dimensions, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { useProfile } from '../context/ProfileContext';
import Input from '../components/Input';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Profile'>>();
  const { profile, setProfile } = useProfile();

  const [user, setUser] = useState(profile.user);
  const [phone, setPhone] = useState(profile.phone);
  const [gender, setGender] = useState(profile.gender);
  const [dob, setDob] = useState(profile.dob);
  const [profileImage, setProfileImage] = useState<string | null>(profile.profileImage);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleNext = () => {
    if (!user || !phone || !gender || !dob) {
      alert("Please fill all the fields.");
      return;
    }

    setProfile({ user, phone, gender, dob, profileImage });
    navigation.navigate('ScholarshipInfo');
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const date = selectedDate.toISOString().split('T')[0];
      setDob(date);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient colors={['#AFC8E8', '#FAD6A5', '#FF9A8B']} style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.heading}>Complete Your Profile</Text>

          <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
            {profileImage ? <Image source={{ uri: profileImage }} style={styles.profileImage} /> : <Image source={require('../assets/profile-img.png')} style={styles.profileImage} />}
          </TouchableOpacity>

          <View style={styles.form}>
            <Input label="Username" value={user} onChange={setUser} />
            <Input label="Phone" value={phone} onChange={setPhone} keyboardType="phone-pad" />

            <Text style={styles.label}>Gender</Text>
            <RNPickerSelect
              onValueChange={setGender}
              value={gender}
              placeholder={{ label: "Select gender", value: "" }}
              items={[
                { label: 'Male', value: 'Male' },
                { label: 'Female', value: 'Female' },
                { label: 'Non-Binary', value: 'Non-Binary' },
                { label: 'Other', value: 'Other' },
              ]}
              style={{ inputIOS: styles.inputIOS, inputAndroid: styles.inputAndroid }}
            />

            <Text style={styles.label}>Date of Birth</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
              <Text>{dob || "Select date"}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                mode="date"
                value={dob ? new Date(dob) : new Date()}
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={onDateChange}
              />
            )}
          </View>

          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>NEXT ➜</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  imageContainer: { width: 130, height: 130, borderRadius: 65, overflow: 'hidden', borderWidth: 2, borderColor: '#ccc', marginBottom: 30 },
  profileImage: { width: '100%', height: '100%' },
  form: { width: width * 0.9, backgroundColor: 'white', borderRadius: 16, padding: 20, marginBottom: 30 },
  label: { fontSize: 14, fontWeight: '600', color: '#555', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, backgroundColor: '#f9f9f9' },
  button: { backgroundColor: '#333', paddingVertical: 14, borderRadius: 8, width: width * 0.85, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold' },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    color: '#333',
    backgroundColor: '#f9f9f9',
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    color: '#333',
    backgroundColor: '#f9f9f9',
    marginBottom: 20,
  }
});

export default ProfileScreen;