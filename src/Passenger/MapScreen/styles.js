import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 10,
    height: "18%",
  },
  titleStyle: {
    fontFamily: "uber1",
    fontSize: 28,
  },
  textInput: {
    fontFamily: "uber2",
    padding: 10,
    backgroundColor: "#eee",
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
  locationText: {
    fontFamily: "uber2",
  },
  separator: {
    backgroundColor: "#efefef",
    height: 1,
  },
  listView: {
    position: "absolute",
    top: 114,
  },
  autocompleteContainer: {
    position: "absolute",
    top: 0,
    left: 10,
    right: 10,
  },
  circle: {
    width: 5,
    height: 5,
    backgroundColor: "black",
    position: "absolute",
    top: 30,
    left: 15,
    borderRadius: 5,
  },
  line: {
    width: 1,
    height: 50,
    backgroundColor: "#919191",
    position: "absolute",
    top: 35,
    left: 17,
  },
  square: {
    width: 5,
    height: 5,
    backgroundColor: "black",
    position: "absolute",
    top: 85,
    left: 15,
  },
  map: {
    height: "100%",
    width: "100%",
  },
});

export default styles;
