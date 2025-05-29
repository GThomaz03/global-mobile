import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {colors} from '../styles/Colors';

export default function Emergencia() {
  return (
    <View style={styles.container}>
      <Text>Emergência</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});