import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#dbdbdb",
  },
  containerUnselected: {
    backgroundColor: "white",
  },
  containerSelected: {
    backgroundColor: "#D1D0D0",
  },
  image: {
    height: 70,
    width: 80,
    resizeMode: "contain",
  },
  middleContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  type: {
    fontWeigth: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  time: {
    color: "#5d5d5d",
  },
  rightContainer: {
    width: 100,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  price: {
    fontWeigth: "bold",
    fontSize: 18,
    marginLeft: 5,
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  titleText: {
    fontSize: 24,
  },
});

export default styles;
