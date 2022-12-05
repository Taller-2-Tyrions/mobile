import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeNavigator from "./HomeNavigator";
import { AuthProvider } from "../hooks/useAuth";
import { AuthProfileProvider } from "../hooks/useAuthProfile";
import { LocationProvider } from "../hooks/useLocation";
import { AuthGoogleProvider } from "../hooks/useAuthGoogle";
import { PushNotificationProvider } from "../hooks/usePushNotification";

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <PushNotificationProvider>
        <AuthProvider>
          <AuthGoogleProvider>
            <AuthProfileProvider>
              <LocationProvider>
                <HomeNavigator />
              </LocationProvider>
            </AuthProfileProvider>
          </AuthGoogleProvider>
        </AuthProvider>
      </PushNotificationProvider>
    </NavigationContainer>
  );
};

export default RootNavigator;
