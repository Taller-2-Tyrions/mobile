import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeNavigator from "./HomeNavigator";
import CustomDrawer from "./CustomDrawer";
import { AuthProvider } from "../hooks/useAuth";
import { AuthProfileProvider } from "../hooks/useAuthProfile";
import { LocationProvider } from "../hooks/useLocation";
import { PushNotificationProvider } from "../hooks/usePushNotification";
import DriverHomeScreen from "../screens/DriverHomeScreen";

const Drawer = createDrawerNavigator();

const DummyScreen = (props) => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>{props.name}</Text>
  </View>
);

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <PushNotificationProvider>
        <AuthProvider>
          <AuthProfileProvider>
            <LocationProvider>
              <Drawer.Navigator
                screenOptions={{ headerShown: false }}
                drawerContent={(props) => <CustomDrawer {...props} />}
              >
                <Drawer.Screen name="Home" component={HomeNavigator} />

                <Drawer.Screen name="Your Trips">
                  {() => <DummyScreen name={"Your Trips"} />}
                </Drawer.Screen>

                <Drawer.Screen name="Wallet">
                  {() => <DummyScreen name={"Wallet"} />}
                </Drawer.Screen>

                <Drawer.Screen name="Driver App">
                  {() => <DriverHomeScreen />}
                </Drawer.Screen>
              </Drawer.Navigator>
            </LocationProvider>
          </AuthProfileProvider>
        </AuthProvider>
      </PushNotificationProvider>
    </NavigationContainer>
  );
};

export default RootNavigator;
