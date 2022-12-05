import * as Font from "expo-font";

export default useFonts = async () => {
  await Font.loadAsync({
    uber1: require("../assets/uber-font/uber-font1.otf"),
    uber2: require("../assets/uber-font/uber-font2.otf"),
  });
};
