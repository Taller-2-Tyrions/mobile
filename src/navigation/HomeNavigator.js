import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useAuth from "../hooks/useAuth";

import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import InitScreen from "../screens/HomeScreen/InitScreen";
import HomeScreen from "../screens/HomeScreen";
import PassengerForm from "../screens/Forms/PassengerForm";
import MapScreen from "../screens/MapScreen";
import InitPickDriver from "../screens/PickDriver/InitPickDriver";
import InitPassengerVoyage from "../screens/PassengerVoyage/InitPassengerVoyage";
import InitDriverScreen from "../screens/DriverHomeScreen/InitDriverScreen";
import DriverVoyage from "../screens/DriverVoyage";

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
          <Stack.Screen name="PickDrivers" component={InitPickDriver} />
          <Stack.Screen
            name="PassengerVoyage"
            component={InitPassengerVoyage}
          />
          <Stack.Screen name="DriverScreen" component={InitDriverScreen} />
          <Stack.Screen name="DriverVoyage" component={DriverVoyage} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default HomeNavigator;
