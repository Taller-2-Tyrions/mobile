import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Test from "./Test";
import Test2 from "./Test2";
import TestHome from "./TestHome";
import { DriverProvider } from "./useDriver";

const Stack = createNativeStackNavigator();

const NavigationDriver = () => {
  return (
    <NavigationContainer>
      <DriverProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <>
            <Stack.Screen name="Home" component={TestHome} />
            <Stack.Screen name="Test1" component={Test} />
            <Stack.Screen name="Test2" component={Test2} />
          </>
        </Stack.Navigator>
      </DriverProvider>
    </NavigationContainer>
  );
};

export default NavigationDriver;

const styles = StyleSheet.create({});
