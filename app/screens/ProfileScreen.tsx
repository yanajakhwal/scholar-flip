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
  ScrollView,
  Dimensions
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation'; // or wherever your type is

type KeyboardOption = 'default' | 'email-address' | 'numeric' | 'phone-pad';

type FieldProps = {
  label: string;
  placeholder: string;
  value: string;
  set: React.Dispatch<React.SetStateAction<string>>;
  keyboard?: KeyboardOption;
};

const ProfileScreen = () => {
  const [user, setUser] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Profile'>>();
  const email = 'test123@gmail.com';

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
    navigation.navigate('ScholarshipInfo'); // You should have this route setup
  };

  const fields: FieldProps[] = [
    { label: 'Username', placeholder: 'username', value: user, set: setUser },
    { label: 'Phone', placeholder: '+1 123-456-7890', value: phone, set: setPhone, keyboard: 'phone-pad' },
    { label: 'Gender', placeholder: 'gender', value: gender, set: setGender },
    { label: 'Date of birth', placeholder: '24/12/2005', value: dob, set: setDob, keyboard: 'numeric' }
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <LinearGradient colors={['#AFC8E8', '#FAD6A5', '#FF9A8B']} style={styles.background}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.heading}>Complete Your Profile</Text>

          {/* Profile Picture */}
          <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <Image source={require('../assets/profile-img.png')} style={styles.profileImage} />
            )}
          </TouchableOpacity>

          {/* Info Fields */}
          <View style={styles.detailsContainer}>
            {fields.map((field, index) => (
              <View key={index}>
                <Text style={styles.label}>{field.label}</Text>
                <TextInput
                  style={styles.input}
                  placeholder={field.placeholder}
                  value={field.value}
                  onChangeText={field.set}
                  keyboardType={field.keyboard ?? 'default'}
                />
              </View>
            ))}

            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{email}</Text>
          </View>

          {/* Next Button */}
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>NEXT ➜</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    paddingBottom: 60,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 20,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  imageContainer: {
    width: 130,
    height: 130,
    borderRadius: 65,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    width: width * 0.9,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
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
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: width * 0.85,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default ProfileScreen;