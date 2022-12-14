import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { UserProvider } from "./useUser";
import { PassengerProvider } from "./Passenger/usePassenger";
import { DriverProvider } from "./Driver/useDriver";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginHome from "./Home/Login";
import PassengerForm from "./Home/PassengerForm";
import Home from "./Home/Home";
import HomePassenger from "./Passenger/HomePassenger/HomePassenger";
import HomeDriver from "./Driver/HomeDriver";
import Redirect from "./Passenger/Redirect";
import MapScreen from "./Passenger/MapScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <UserProvider>
        <PassengerProvider>
          <DriverProvider>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Root" component={LoginHome} />
              <Stack.Screen name="PassengerForm" component={PassengerForm} />
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Passenger" component={Redirect} />
              <Stack.Screen name="HomePassenger" component={HomePassenger} />
              <Stack.Screen name="Driver" component={HomeDriver} />
              <Stack.Screen name="MapScreen" component={MapScreen} />
            </Stack.Navigator>
          </DriverProvider>
        </PassengerProvider>
      </UserProvider>
    </NavigationContainer>
  );
};

export default Navigation;
