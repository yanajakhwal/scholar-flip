import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  Keyboard, 
  TouchableWithoutFeedback 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

const Profile = () => {
  const [name, setName] = useState<string>('John Doe');
  const [bio, setBio] = useState<string>('A short bio about yourself.');
  const [profileImage, setProfileImage] = useState<string | null>(null);

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
        <View style={styles.container}>
          <TouchableOpacity onPress={pickImage}>
            <Image 
              source={profileImage ? { uri: profileImage } : require('../assets/icon.png')} 
              style={styles.profileImage} 
            />
          </TouchableOpacity>
          <Text style={styles.label}>Name:</Text>
          <TextInput 
            style={styles.input} 
            value={name} 
            onChangeText={setName} 
          />
          <Text style={styles.label}>Bio:</Text>
          <TextInput 
            style={[styles.input, styles.bioInput]} 
            value={bio} 
            onChangeText={setBio} 
            multiline
          />
          <Button title="Save Profile" onPress={() => alert('Profile Saved!')} />
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF', padding: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 20 },
  label: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  input: { width: '100%', borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, fontSize: 16, marginBottom: 10 },
  bioInput: { height: 80, textAlignVertical: 'top' },
});

export default Profile;