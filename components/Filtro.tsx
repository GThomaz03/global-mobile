import React from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';
import {colors} from '../styles/Colors';

type FiltroProps = {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  style?: object;
};

export default function Filtro({ options = [], selected, onSelect, style }: FiltroProps) {
  return (
    <View style={[Styles.container, style]}>
      <Picker style={Styles.picker}
        selectedValue={selected}
        onValueChange={(value) => onSelect(value)}
      >
        <Picker.Item label="Todos" value="Todos" />
        {options.map((option) => (
          <Picker.Item key={option} label={option} value={option} />
        ))}
      </Picker>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#000',
    backgroundColor: colors.secondary,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    fontSize: 10
  },
});