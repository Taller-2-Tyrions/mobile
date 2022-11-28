import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    height: Dimensions.get("window").height - 100,
  },
});

export default styles;
