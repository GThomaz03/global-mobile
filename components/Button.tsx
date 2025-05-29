import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "../styles/Colors";

interface ButtonProps {
  title: string;
  onPress: () => void;
}

const Button = ({ title, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
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
