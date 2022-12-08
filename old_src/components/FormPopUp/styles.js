import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 20,
    height: "100%",
    justifyContent: "space-between",
    backgroundColor: "#00000099",
  },
  popupContainer: {
    height: Dimensions.get("window").height - 70,
    backgroundColor: "white",
    top: 50,
    borderRadius: 10,
  },
  title: {
    alignItems: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    margin: 20,
  },
  formContainer: {
    height: Dimensions.get("window").height - 200,
    marginHorizontal: 15,
  },
  titleContainer: {
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  textInput: {
    padding: 10,
    backgroundColor: "#eee",
    marginVertical: 5,
  },
  autocompleteContainer: {
    position: "absolute",
    top: 0,
    left: 10,
    right: 10,
  },
  listView: {
    position: "absolute",
    top: 55,
  },
  separator: {
    backgroundColor: "#efefef",
    height: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  iconContainer: {
    backgroundColor: "#a2a2a2",
    padding: 5,
    borderRadius: 50,
    marginRight: 15,
  },
  locationText: {},
});

export default styles;
