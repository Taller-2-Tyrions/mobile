import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  cancelContainer: {
    height: Dimensions.get("window").height * 0.075,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  map: {
    flex: 1,
    width: Dimensions.get("window").width,
  },
  button: {
    position: "absolute",
    width: 300,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    bottom: 40,
    left: Dimensions.get("window").width / 8,
  },
  textButton: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  distanceContainer: {
    position: "absolute",
    width: 300,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    bottom: 700,
    left: Dimensions.get("window").width / 8,
  },
  distanceText: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
});

export default styles;
