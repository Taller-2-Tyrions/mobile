import React, { useState, useEffect } from "react";
import useFonts from "./src/hooks/useFonts";
import AppLoading from "expo-app-loading";
import RootNavigator from "./src/RootNavigator";
import { LogBox, StatusBar } from "react-native";

export default function App() {
  const [IsReady, SetIsReady] = useState(false);

  LogBox.ignoreLogs([
    "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
    ,
    "expo-app-loading is deprecated in favor of expo-splash-screen: use SplashScreen.preventAutoHideAsync() and SplashScreen.hideAsync() instead. https://docs.expo.dev/versions/latest/sdk/splash-screen/",
  ]);

  useEffect(() => {
    StatusBar.setHidden(true);
  }, []);

  const LoadFonts = async () => {
    await useFonts();
  };

  if (!IsReady) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => SetIsReady(true)}
        onError={() => {}}
      />
    );
  } else {
    return (
      <>
        <RootNavigator />
      </>
    );
  }
}
