import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    width: "100%",
  },
  titleContainer: {
    marginTop: 50,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  titleText: {
    fontSize: 24,
  },
  containerList: {
    backgroundColor: "white",
    height: Dimensions.get("window").height - 200,
  },
  containerSelectedRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#dbdbdb",
    backgroundColor: "#B7B9B9",
  },
  containerRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#dbdbdb",
  },
  containerButton: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  imageRow: {
    height: 70,
    width: 80,
    resizeMode: "contain",
  },
  middleContainerRow: {
    flex: 1,
    marginHorizontal: 10,
  },
  typeRow: {
    fontWeigth: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  timeRow: {
    color: "#5d5d5d",
  },
  rightContainerRow: {
    width: 100,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  priceRow: {
    fontWeigth: "bold",
    fontSize: 18,
    marginTop: 10,
  },
  infoButtonRow: {
    marginBottom: 5,
    width: "60%",
  },
  infoRow: {
    fontSize: 16,
    color: "#068189",
  },
});

export default styles;
