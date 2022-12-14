import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";

const CustomInput = ({
  control,
  name,
  placeholder,
  secureTextEntry,
  containerStyle,
  textStyle,
  rules = {},
  defaultValue = {},
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <View
            style={[
              containerStyle ? containerStyle : styles.container,
              { borderColor: error ? "red" : "#e8e8e8" },
            ]}
          >
            <TextInput
              value={value}
              defaultValue={defaultValue}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={textStyle ? textStyle : styles.input}
              secureTextEntry={secureTextEntry}
            />
          </View>
          {error && (
            <Text style={{ color: "red", alignSelf: "stretch" }}>
              {error.message || "Error"}
            </Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  input: {},
});

export default CustomInput;
