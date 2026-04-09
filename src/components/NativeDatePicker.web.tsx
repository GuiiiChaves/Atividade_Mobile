import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface Props {
  value: string;
  onChange: (text: string) => void;
}

const NativeDatePicker: React.FC<Props> = ({ value, onChange }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder="Data de vencimento (DD/MM/AAAA)"
      value={value}
      onChangeText={onChange}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    fontSize: 15,
    paddingVertical: 8,
    paddingHorizontal: 4,
    color: '#555',
  },
});

export default NativeDatePicker;
