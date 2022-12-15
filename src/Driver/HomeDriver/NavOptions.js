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
import { useNavigation } from "@react-navigation/native";
import useDriver from "../useDriver";
import useUser from "../../useUser";

const data1 = [
  {
    id: "1",
    title: "FIUBER APP",
    image: require("../../assets/images/logo.png"),
    screen: "Home",
    bg: "bg-gray-100",
  },
  {
    id: "2",
    title: "Calificaciones",
    image: require("../../assets/images/star.png"),
    screen: "CalificationsDriver",
    bg: "bg-gray-100",
  },
];

const data2 = [
  {
    id: "3",
    title: "Historial viajes",
    image: require("../../assets/images/history.png"),
    screen: "TripsDriver",
    bg: "bg-gray-100",
  },
];

const NavOptions = () => {
  return (
    <View style={styles.navOptionsContainer}>
      <TwoOptions data={data1} />
      <TwoOptions data={data2} />
    </View>
  );
};

const TwoOptions = ({ data }) => {
  const navigation = useNavigation();
  const { driverOffline, clearDriver } = useDriver();
  const { setStatus, clearUser } = useUser();

  const changeScreen = (item) => {
    if (item.screen === "Home") {
      driverOffline();
      setStatus(null);
      clearDriver();
      navigation.navigate("Home");
    } else if (item.screen === "Root") {
      clearDriver();
      clearUser();
      navigation.navigate("Root");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => changeScreen(item)}
            style={tw`p-2 pl-6 pb-8 pt-4 ${item.bg} m-2 w-40`}
          >
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
  navOptionsContainer: {
    paddingTop: 20,
  },
  container: {
    paddingTop: 10,
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
