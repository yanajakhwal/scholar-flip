// ScholarshipInfo.tsx
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useProfile } from '../context/ProfileContext';
import { ScrollView, TextInput, Text, View, TouchableOpacity, StyleSheet, Keyboard, TouchableWithoutFeedback, Dimensions, KeyboardTypeOptions } from 'react-native';

const { width } = Dimensions.get('window');

const ScholarshipInfo = () => {
  const navigation = useNavigation();
  const { profile, scholarship, setScholarship } = useProfile();

  const [school, setSchool] = useState(scholarship.school);
  const [field, setField] = useState(scholarship.field);
  const [gpa, setGpa] = useState(scholarship.gpa);
  const [achievements, setAchievements] = useState(scholarship.achievements);

  const handleSubmit = () => {
    setScholarship({ school, field, gpa, achievements });

    console.log('Full submission → ', {
      profile,
      scholarship: { school, field, gpa, achievements }
    });

    alert('Profile and Scholarship Info Submitted!');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient colors={['#AFC8E8', '#FAD6A5', '#FF9A8B']} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.heading}>Scholarship Details</Text>

          <View style={styles.form}>
            <Input label="School / University" value={school} onChange={setSchool} />
            <Input label="Field of Study" value={field} onChange={setField} />
            <Input label="GPA / Grade Average" value={gpa} onChange={setGpa} keyboardType="numeric" />
            <Input label="Awards / Achievements" value={achievements} onChange={setAchievements} />
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
    justifyContent: 'center', // ✅ Center everything vertically
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  form: {
    width: width * 0.9,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitBtn: {
    backgroundColor: '#333',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginBottom: 20,
  },
  submitText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backText: {
    color: '#444',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default ScholarshipInfo;