import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./hooks/useAuth";
import { PushNotificationProvider } from "./hooks/usePushNotification";
import InitScreen from "./InitScreen";

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <PushNotificationProvider>
        <AuthProvider>
          <InitScreen />
        </AuthProvider>
      </PushNotificationProvider>
    </NavigationContainer>
  );
};

export default RootNavigator;
