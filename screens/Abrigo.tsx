import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {colors} from '../styles/Colors';

export default function Abrigo() {
  return (
    <View style={styles.container}>
      <Text>Abrigos</Text>
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