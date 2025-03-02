import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const LoginSignupScreen = () => {
  const navigation = useNavigation();
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between login & sign-up
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <LinearGradient colors={['#AFC8E8', '#FAD6A5', '#FF9A8B']} style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.title}>{isSignUp ? 'Sign Up' : 'Log In'}</Text>

          {/* Email Input */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Password Input */}
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#666"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {/* Submit Button */}
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => console.log(isSignUp ? 'Sign Up Pressed' : 'Login Pressed')}
          >
            <Text style={styles.buttonText}>{isSignUp ? 'Sign Up' : 'Log In'}</Text>
          </TouchableOpacity>

          {/* Toggle Between Login & Sign Up */}
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
  input: { 
    width: '90%', 
    padding: 15, 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    marginBottom: 15, 
    fontSize: 16, 
    color: '#333', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.5,
    elevation: 3
  },
  button: { 
    backgroundColor: '#FF9A8B', 
    padding: 15, 
    borderRadius: 10, 
    width: '90%', 
    alignItems: 'center' 
  },
  buttonText: { color: '#333', fontWeight: 'bold', fontSize: 16 },
  switchText: { color: '#333', marginTop: 15, fontSize: 14, fontWeight: 'bold' },
});

export default LoginSignupScreen;


