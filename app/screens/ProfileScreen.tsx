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

const Profile = () => {
  const [name, setName] = useState('');
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

          {/* Profile Image */}
          <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.profileImage} />
            )}
          </TouchableOpacity>

          {/* Editable Fields */}
          <View style={styles.detailsContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{email}</Text>

            <Text style={styles.label}>Phone</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Enter your phone"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />

            <Text style={styles.label}>Gender</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Enter your gender"
              value={gender}
              onChangeText={setGender}
            />

            <Text style={styles.label}>Date of Birth</Text>
            <TextInput 
              style={styles.input} 
              placeholder="DD/MM/YYYY"
              keyboardType="numeric"
              value={dob}
              onChangeText={setDob}
            />
          </View>

          {/* Save Profile Button */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>SAVE INFORMATION</Text>
          </TouchableOpacity>

          {/* Profile Completion Sections */}
          <View style={styles.sectionContainer}>
            <Text style={styles.progressText}>2/4 Completed</Text>
            <Text style={styles.instruction}>You must complete your profile before submitting applications.</Text>

            <View style={styles.section}>
              <Ionicons name="person-circle-outline" size={24} color="#4A90E2" />
              <View style={styles.sectionText}>
                <Text style={styles.sectionTitle}>Personal Details</Text>
                <Text style={styles.sectionDescription}>Full name, email, phone number, and your address</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Ionicons name="school-outline" size={24} color="#4A90E2" />
              <View style={styles.sectionText}>
                <Text style={styles.sectionTitle}>Education</Text>
                <Text style={styles.sectionDescription}>Enter your educational history to be considered by the recruiter</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Ionicons name="briefcase-outline" size={24} color="#4A90E2" />
              <View style={styles.sectionText}>
                <Text style={styles.sectionTitle}>Experience</Text>
                <Text style={styles.sectionDescription}>Enter your work experience to be considered by the recruiter</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Ionicons name="document-text-outline" size={24} color="#4A90E2" />
              <View style={styles.sectionText}>
                <Text style={styles.sectionTitle}>Application Profile</Text>
                <Text style={styles.sectionDescription}>Create your application profile. Applying for jobs is easier.</Text>
              </View>
            </View>
          </View>

        </ScrollView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  imageContainer: {
    alignSelf: 'center',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
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
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90E2',
    textAlign: 'center',
  },
  instruction: {
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 10,
    color: '#666',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  sectionText: {
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default Profile;