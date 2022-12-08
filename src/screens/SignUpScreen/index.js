import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpScreen = () => {
  const { user, register } = useAuth();
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

    /*if (user.accessToken) {
      navigation.navigate("Home");
    }*/
  };

  const onSignInPressed = () => {
    navigation.navigate("SignIn");
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <ScrollView showVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <Text style={styles.title}>Create an account</Text>

          <CustomInput
            name="email"
            placeholder="Email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
            }}
          />
          <CustomInput
            name="password"
            placeholder="Password"
            control={control}
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password should be minimum 8 characters long",
              },
            }}
            secureTextEntry
          />
          <CustomInput
            name="password-repeat"
            placeholder="Repeat password"
            control={control}
            rules={{
              validate: (value) =>
                value === pwd ? true : "Password do not match",
            }}
            secureTextEntry
          />

          <CustomButton
            text="Register"
            onPress={handleSubmit(onRegisterPressed)}
          />

          <CustomButton
            text="Have an account? Sign in"
            onPress={onSignInPressed}
            type="TERTIARY"
          />
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    margin: 10,
  },
  text: {
    color: "gray",
    marginVertical: 10,
  },
  link: {
    color: "#FDB075",
  },
});

export default SignUpScreen;
