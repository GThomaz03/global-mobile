//Tela Home que será um feed com as postagens de pessoas da região

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {colors} from '../styles/Colors';
import Button from '../components/Button';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text>Feed</Text>
      <Button title="Ver mais" onPress={() => {}} />
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