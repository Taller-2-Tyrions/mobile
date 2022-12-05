import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { AntDesign } from "@expo/vector-icons";

const data = [
  {
    id: "1",
    title: "Iniciar viaje",
    image: require("../../assets/images/map.png"),
    screen: "MapScreen",
    bg: "bg-gray-100",
  },
  {
    id: "2",
    title: "Driver app",
    image: require("../../assets/images/car.png"),
    screen: "DriverScreen",
    bg: "bg-gray-100",
  },
  {
    id: "3",
    title: "Logout",
    image: require("../../assets/images/logout.png"),
    screen: "LoginScreen",
    bg: "bg-red-100",
  },
];

const NavOptions = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity style={tw`p-2 pl-6 pb-8 pt-4 ${item.bg} m-2 w-40`}>
            <View>
              <Image style={styles.image} source={item.image} />
              <Text style={[tw`mt-2 text-lg`, styles.titleText]}>
                {item.title}
              </Text>
              <AntDesign
                style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                name="arrowright"
                size={24}
                color="white"
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default NavOptions;

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontFamily: "uber2",
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    borderRadius: 30,
  },
});
