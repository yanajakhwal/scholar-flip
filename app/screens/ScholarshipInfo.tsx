import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const ScholarshipInfo = () => {
  const [school, setSchool] = useState('');
  const [field, setField] = useState('');
  const [gpa, setGpa] = useState('');
  const [achievements, setAchievements] = useState('');
  const navigation = useNavigation();

  const handleSubmit = () => {
    // Normally you'd save the data or call an API here
    console.log({ school, field, gpa, achievements });
    alert('Information submitted!');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient colors={['#FAD6A5', '#FF9A8B', '#AFC8E8']} style={styles.background}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.heading}>Scholarship Details</Text>

          <View style={styles.form}>
            <InputField label="School / University" value={school} onChangeText={setSchool} />
            <InputField label="Field of Study" value={field} onChangeText={setField} />
            <InputField label="GPA / Grade Average" value={gpa} onChangeText={setGpa} keyboardType="numeric" />
            <InputField
              label="Awards / Achievements"
              value={achievements}
              onChangeText={setAchievements}
              multiline
              height={100}
            />
          </View>

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitText}>SUBMIT ✅</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← Back to Profile</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

const InputField = ({
  label,
  value,
  onChangeText,
  keyboardType = 'default',
  multiline = false,
  height = 50
}: {
  label: string;
  value: string;
  onChangeText: (val: string) => void;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  multiline?: boolean;
  height?: number;
}) => (
  <View style={{ marginBottom: 15 }}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, { height }]}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      multiline={multiline}
    />
  </View>
);

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    padding: 20,
    alignItems: 'center',
    paddingBottom: 40,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  form: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: width * 0.9,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  submitBtn: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: width * 0.85,
  },
  submitText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backText: {
    color: '#555',
    fontSize: 14,
    marginTop: 15,
    textDecorationLine: 'underline',
  },
});

export default ScholarshipInfo;