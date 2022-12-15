import { StyleSheet, Text, TouchableOpacity, Image, View } from "react-native";
import React from "react";
import useDriver from "../useDriver";
import useUser from "../../useUser";
import { useNavigation } from "@react-navigation/native";

const Logout = () => {
  const navigation = useNavigation();
  const { clearDriver } = useDriver();
  const { clearUser } = useUser();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        clearDriver();
        clearUser();
        navigation.navigate("Root");
      }}
    >
      <Image
        source={require("../../assets/images/logout.png")}
        style={styles.image}
      />
      <Text style={styles.text}>Logout</Text>
    </TouchableOpacity>
  );
};

export default Logout;

const styles = StyleSheet.create({
  container: {
    height: "8%",
    width: "100%",
    padding: 5,
    marginTop: 50,
    flexDirection: "row",
    borderRadius: 25,
    marginBottom: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 50,
  },
  text: {
    fontFamily: "uber1",
    fontSize: 24,
  },
  trip: {
    backgroundColor: "white",
    borderRadius: 20,
  },
  image: {
    width: 120,
    height: 90,
    resizeMode: "contain",
    borderRadius: 30,
  },
});
