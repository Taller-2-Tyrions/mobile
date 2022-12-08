import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const CustomButton = ({
  onPress,
  text,
  type = "PRIMARY",
  bgColor,
  fgColor,
  position,
  bottom,
  disabled,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        disabled
          ? { backgroundColor: "#ACACAC" }
          : bgColor
          ? { backgroundColor: bgColor }
          : {},
        position
          ? {
              position: position,
              bottom: bottom,
            }
          : {},
      ]}
      disabled={disabled}
    >
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? { color: fgColor } : {},
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 5,
  },
  container_PRIMARY: {
    backgroundColor: "#3B71F3",
  },
  container_SECONDARY: {
    borderColor: "#3B71F3",
    borderWidth: 2,
  },
  container_TERTIARY: {},
  text_PRIMARY: {
    fontWeight: "bold",
    color: "white",
  },
  text_SECONDARY: {
    color: "#3B71F3",
  },
  text_TERTIARY: {
    color: "gray",
  },
});

export default CustomButton;
