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
import InitDriver from "./Driver/InitDriver";
import Redirect from "./Passenger/Redirect";
import MapScreen from "./Passenger/MapScreen";
import PickDriver from "./Passenger/PickDriver";
import SendRequest from "./Passenger/Voyage/SendRequest";
import WaitResponse from "./Passenger/Voyage/WaitResponse";
import PassengerVoyage from "./Passenger/Voyage/PassengerVoyage";
import RedirectDriver from "./Driver/RedirectDriver";
import DriverForm from "./Driver/DriverForm";
import HomeDriver from "./Driver/HomeDriver/HomeDriver";
import VoyageDriver from "./Driver/VoyageDriver";

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
              <Stack.Screen name="MapScreen" component={MapScreen} />
              <Stack.Screen name="PickDriver" component={PickDriver} />
              <Stack.Screen name="SendRequest" component={SendRequest} />
              <Stack.Screen name="WaitResponse" component={WaitResponse} />
              <Stack.Screen
                name="PassengerVoyage"
                component={PassengerVoyage}
              />
              <Stack.Screen name="Driver" component={RedirectDriver} />
              <Stack.Screen name="DriverForm" component={DriverForm} />
              <Stack.Screen name="InitDriver" component={InitDriver} />
              <Stack.Screen name="HomeDriver" component={HomeDriver} />
              <Stack.Screen name="VoyageDriver" component={VoyageDriver} />
            </Stack.Navigator>
          </DriverProvider>
        </PassengerProvider>
      </UserProvider>
    </NavigationContainer>
  );
};

export default Navigation;
