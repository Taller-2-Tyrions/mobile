import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  useWindowDimensions,
  ScrollView,
  StyleSheet,
} from "react-native";
import Logo from "../assets/images/logo.png";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import GoogleButton from "../components/GoogleButton";

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
      <ScrollView showVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <Image
            source={Logo}
            style={[styles.logo, { height: height * 0.3 }]}
            resizeMode="contain"
          />

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

          <CustomButton
            text="Iniciar sesión"
            onPress={handleSubmit(onSignInPressed)}
          />

          <GoogleButton onPress={signInGoogle} />

          <CustomButton
            text="¿No tenés una cuenta? Creá una"
            type="TERTIARY"
            onPress={goToSignUp}
          />
        </View>
      </ScrollView>
    );
  }
};

export default SignInScreen;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
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
});
