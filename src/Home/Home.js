import { Text, View } from "react-native";
import React, { useEffect } from "react";
import tw from "tailwind-react-native-classnames";
import useUser from "../useUser";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();
  const { profile, getProfile, status, getStatus } = useUser();

  useEffect(() => {
    if (!profile) {
      const timer = setInterval(() => getProfile(), 2000);
      return () => clearInterval(timer);
    }
  }, [profile]);

  useEffect(() => {
    if (!profile) return;

    if (!status) {
      const timer = setInterval(() => getStatus(), 2000);
      return () => clearInterval(timer);
    }

    if (status.Rol === "Passenger") {
      navigation.navigate("Passenger");
    } else {
      navigation.navigate("Driver");
    }
  }, [profile, status]);

  return (
    <View style={tw`h-full w-full bg-white`}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <Text style={{ fontSize: 30, fontFamily: "uber1" }}>
          Cargando contenido...
        </Text>
      </View>
    </View>
  );
};

export default Home;
