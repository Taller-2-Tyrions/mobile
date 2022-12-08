import React from "react";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import tw from "tailwind-react-native-classnames";
import useAuth from "./hooks/useAuth";
import SignInScreen from "./screens/SignIn";
import SignUpScreen from "./screens/SignUp";

const Stack = createNativeStackNavigator();

const TestScreen = () => {
  return <View style={tw`h-full w-full bg-blue-300`}></View>;
};

const InitScreen = () => {
  const { user } = useAuth();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user.accessToken ? (
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={TestScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default InitScreen;
