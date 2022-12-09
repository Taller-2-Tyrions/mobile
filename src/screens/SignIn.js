import React, { useState, useEffect } from "react";
import { View, Text, useWindowDimensions, StyleSheet } from "react-native";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import CustomInput from "../components/CustomInput";
import OkButton from "../components/OkButton";
import CustomButton from "../components/CustomButton";
import GoogleButton from "../components/GoogleButton";
import Title from "../components/Title";
import tw from "tailwind-react-native-classnames";

const SignInScreen = () => {
  const { signIn, logout } = useAuth();
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const { control, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  // reset del usuario para que no hayan bugs
  useEffect(() => {
    console.log("logout user");
    logout();
    navigation.navigate("SignIn");
    setLoading(false);
  }, []);

  const goToSignUp = () => {
    navigation.navigate("SignUp");
  };

  const onSignInPressed = async (data) => {
    setLoading(true);
    await signIn(data);
  };

  const signInGoogle = async () => {
    //await signInWithGoogle();
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <View style={styles.root}>
        <Title title="Iniciar sesión" />

        <View style={{ height: "50%" }}>
          <FormData
            control={control}
            handleSubmit={handleSubmit}
            onSignInPressed={onSignInPressed}
          />

          <OkButton onPress={handleSubmit(onSignInPressed)} />
        </View>

        <View style={tw`mt-10`}>
          <View style={tw`flex-row justify-center mb-5`}>
            <View style={[styles.line, tw`mt-3 mr-2`]}></View>
            <Text>o</Text>
            <View style={[styles.line, tw`mt-3 ml-2`]}></View>
          </View>
          <GoogleButton onPress={signInGoogle} />
          <CustomButton
            text="¿No tenés una cuenta? Creá una"
            type="TERTIARY"
            onPress={goToSignUp}
          />
        </View>
      </View>
    );
  }
};

const FormData = ({ control }) => {
  return (
    <View style={styles.inputContainer}>
      <CustomInput
        name="email"
        placeholder="Ingresá tu mail"
        control={control}
        rules={{ required: "(*) Campo obligatorio" }}
      />
      <CustomInput
        name="password"
        placeholder="Ingresá tu contraseña"
        control={control}
        rules={{
          required: "(*) Campo obligatorio",
          minLength: {
            value: 4,
            message: "La contraseña tiene que tener al menos 4 carácteres",
          },
        }}
        secureTextEntry
      />
    </View>
  );
};

export default SignInScreen;

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
