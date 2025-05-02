// Input.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardTypeOptions } from 'react-native';

type InputProps = {
  label: string;
  value: string;
  onChange: (val: string) => void;
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
};

const Input = ({ label, value, onChange, keyboardType = 'default', multiline = false }: InputProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          focused && styles.inputFocused,
          multiline && styles.multiline
        ]}
        value={value}
        onChangeText={onChange}
        placeholder={label}
        keyboardType={keyboardType}
        multiline={multiline}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
  inputFocused: {
    borderColor: '#FF9A8B',
  },
  multiline: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default Input;