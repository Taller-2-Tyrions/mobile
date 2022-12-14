import { StyleSheet, Text, View, StatusBar } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect } from "react";
import { LogBox } from "react-native";

SplashScreen.preventAutoHideAsync();

import Navigation from "./src/Navigation";

export default function App() {
  const [fontsLoaded] = useFonts({
    uber1: require("./src/assets/uber-font/uber-font1.otf"),
    uber2: require("./src/assets/uber-font/uber-font2.otf"),
  });

  LogBox.ignoreLogs([
    "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
    ,
    "expo-app-loading is deprecated in favor of expo-splash-screen: use SplashScreen.preventAutoHideAsync() and SplashScreen.hideAsync() instead. https://docs.expo.dev/versions/latest/sdk/splash-screen/",
    "If you are using React Native v0.60.0+ you must follow these instructions to enable currentLocation: https://git.io/Jf4AR",
  ]);

  useEffect(() => {
    StatusBar.setHidden(true);
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
