import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import Logo from "../../../assets/images/logo.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import GoogleButton from "../../components/GoogleButton";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import useAuthGoogle from "../../hooks/useAuthGoogle";
import LottieView from "lottie-react-native";

const SignInScreen = () => {
  const { signInWithGoogle } = useAuthGoogle();
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
    await signInWithGoogle();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LottieView
          source={require("../../assets/images/loading.json")}
          autoPlay
          loop
        />
        <Text
          style={{
            position: "absolute",
            top: 900,
          }}
        >
          loading...
        </Text>
      </View>
    );
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
            placeholder="Email"
            control={control}
            rules={{ required: "Email is required" }}
          />
          <CustomInput
            name="password"
            placeholder="Password"
            control={control}
            rules={{
              required: "Password is required",
              minLength: {
                value: 4,
                message: "Password should be minimum 4 characters long",
              },
            }}
            secureTextEntry
          />

          <CustomButton
            text="Sign in"
            onPress={handleSubmit(onSignInPressed)}
          />

          <GoogleButton onPress={signInGoogle} />

          <CustomButton
            text="Don't have an account? Create one"
            type="TERTIARY"
            onPress={goToSignUp}
          />
        </View>
      </ScrollView>
    );
  }
};

export default SignInScreen;
