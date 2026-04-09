import React, { useState } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Props {
  value: string;
  onChange: (text: string) => void;
}

const NativeDatePicker: React.FC<Props> = ({ value, onChange }) => {
  const [show, setShow] = useState(false);
  const currentDate = value
    ? (() => { const [d, m, y] = value.split('/'); return new Date(`${y}-${m}-${d}`); })()
    : new Date();

  return (
    <>
      <Pressable onPress={() => setShow(true)}>
        <Text style={styles.trigger}>
          {value ? `Vencimento: ${value}` : 'Definir data de vencimento'}
        </Text>
      </Pressable>
      {show && (
        <DateTimePicker
          value={isNaN(currentDate.getTime()) ? new Date() : currentDate}
          mode="date"
          onChange={(_event: unknown, date?: Date) => {
            setShow(false);
            if (date) onChange(date.toLocaleDateString('pt-BR'));
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  trigger: {
    fontSize: 15,
    color: '#555',
    textDecorationLine: 'underline',
  },
});

export default NativeDatePicker;
