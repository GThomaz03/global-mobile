import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "../styles/Colors";

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: object;
}

const Button = ({ title, onPress, style }: ButtonProps) => {
  return (
      <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: colors.textLight,
    fontSize: 16,
    fontWeight: "bold",
  },
});


export default Button;
