import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Test from "./Test";
import Test2 from "./Test2";
import TestHome from "./TestHome";
import { PassengerProvider } from "./usePassenger";
import { Redirect } from "./TestHome";

const Stack = createNativeStackNavigator();

const NavigationPassenger = () => {
  return (
    <NavigationContainer>
      <PassengerProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <>
            <Stack.Screen name="Redirect" component={Redirect} />
            <Stack.Screen name="Home" component={TestHome} />
            <Stack.Screen name="Test1" component={Test} />
            <Stack.Screen name="Test2" component={Test2} />
          </>
        </Stack.Navigator>
      </PassengerProvider>
    </NavigationContainer>
  );
};

export default NavigationPassenger;

const styles = StyleSheet.create({});
