import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/RootNavigator'; 
import { LinearGradient } from 'expo-linear-gradient';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

const LoginSignupScreen = () => {
  const navigation = useNavigation<NavigationProp>(); 

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = () => {
    if (email === "test123@gmail.com" && password === "123password456") {
      navigation.navigate("Profile");
    } else {
      Alert.alert("Invalid Credentials", "Please check your email or password.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <LinearGradient colors={['#AFC8E8', '#FAD6A5', '#FF9A8B']} style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.title}>{isSignUp ? 'Sign Up' : 'Log In'}</Text>

          <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <TextInput style={styles.input} placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} />

          <TouchableOpacity style={styles.button} onPress={handleAuth}>
            <Text style={styles.buttonText}>{isSignUp ? 'Sign Up' : 'Log In'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
            <Text style={styles.switchText}>
              {isSignUp ? 'Already have an account? Log In' : 'New here? Sign Up'}
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  input: { width: '90%', padding: 15, backgroundColor: '#fff', borderRadius: 10, marginBottom: 15 },
  button: { backgroundColor: '#FF9A8B', padding: 15, borderRadius: 10, width: '90%', alignItems: 'center' },
  buttonText: { color: '#333', fontWeight: 'bold', fontSize: 16 },
  switchText: { color: '#333', marginTop: 15, fontSize: 14, fontWeight: 'bold' },
});

export default LoginSignupScreen;