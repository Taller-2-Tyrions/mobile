import RootNavigator from "./src/navigation/RootNavigator";
import React, { useEffect } from "react";
import { LogBox, StatusBar } from "react-native";

export default function App() {
  LogBox.ignoreLogs([
    "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
  ]);

  useEffect(() => {
    StatusBar.setHidden(true);
  }, []);

  return (
    <>
      <RootNavigator />
    </>
  );
}
