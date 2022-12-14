import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { UserProvider } from "./useUser";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginHome from "./Home/Login";
import PassengerForm from "./Home/PassengerForm";
import Home from "./Home/Home";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <UserProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Root" component={LoginHome} />
          <Stack.Screen name="PassengerForm" component={PassengerForm} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </UserProvider>
    </NavigationContainer>
  );
};

export default Navigation;
