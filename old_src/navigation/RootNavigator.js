import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeNavigator from "./HomeNavigator";
import { AuthProvider } from "../hooks/useAuth";
import { AuthProfileProvider } from "../hooks/useAuthProfile";
import { LocationProvider } from "../hooks/useLocation";
import { AuthGoogleProvider } from "../hooks/useAuthGoogle";
import { PushNotificationProvider } from "../hooks/usePushNotification";
import { BalanceProvider } from "../hooks/useBalance";
import { VoyageProvider } from "../hooks/useVoyage";

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <PushNotificationProvider>
        <AuthProvider>
          <AuthGoogleProvider>
            <AuthProfileProvider>
              <LocationProvider>
                <BalanceProvider>
                  <VoyageProvider>
                    <HomeNavigator />
                  </VoyageProvider>
                </BalanceProvider>
              </LocationProvider>
            </AuthProfileProvider>
          </AuthGoogleProvider>
        </AuthProvider>
      </PushNotificationProvider>
    </NavigationContainer>
  );
};

export default RootNavigator;
