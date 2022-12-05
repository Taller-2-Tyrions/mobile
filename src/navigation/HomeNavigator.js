import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useAuth from "../hooks/useAuth";

import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import InitScreen from "../screens/HomeScreen/InitScreen";
import HomeScreen from "../screens/HomeScreen";
import PassengerForm from "../screens/Forms/PassengerForm";
import MapScreen from "../screens/MapScreen";

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
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
          <Stack.Screen name="InitScreen" component={InitScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="PassengerForm" component={PassengerForm} />
          <Stack.Screen name="MapScreen" component={MapScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default HomeNavigator;
