import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";
import Title from "../components/Title";
import OkButton from "../components/OkButton";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpScreen = () => {
  const { register } = useAuth();
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      username: "Default username",
    },
  });
  const pwd = watch("password");
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const onRegisterPressed = async (data) => {
    setLoading(true);
    await register(data);
  };

  const onSignInPressed = () => {
    navigation.navigate("SignIn");
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <View style={styles.root}>
        <Title title="Crear una cuenta" />

        <View style={{ height: "60%" }}>
          <FormData control={control} pwd={pwd} />
          <OkButton onPress={handleSubmit(onRegisterPressed)} />
        </View>
        <View style={{ height: "20%", justifyContent: "flex-start" }}>
          <CustomButton
            text="¿Ya tenés cuenta? Iniciá sesión"
            onPress={onSignInPressed}
            type="TERTIARY"
          />
        </View>
      </View>
    );
  }
};

const FormData = ({ control, pwd }) => {
  return (
    <View style={styles.inputContainer}>
      <CustomInput
        name="email"
        placeholder="Ingresá tu mail"
        control={control}
        rules={{
          required: "(*) Campo obligatorio",
          pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
        }}
      />
      <CustomInput
        name="password"
        placeholder="Ingresá una contraseña"
        control={control}
        rules={{
          required: "(*) Campo obligatorio",
          minLength: {
            value: 8,
            message: "Mínimo requerido para la contraseña: 8",
          },
        }}
        secureTextEntry
      />
      <CustomInput
        name="password-repeat"
        placeholder="Repetí la contraseña"
        control={control}
        rules={{
          validate: (value) =>
            value === pwd ? true : "Las contraseñas no coinciden",
        }}
        secureTextEntry
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 10,
    backgroundColor: "white",
    height: "100%",
    width: "100%",
  },
  inputContainer: {
    padding: 5,
    marginLeft: 15,
    width: "100%",
    height: "30%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
  },
  line: {
    width: "45%",
    borderTopWidth: 1,
    borderTopColor: "gray",
    marginBottom: 20,
  },
});

export default SignUpScreen;
