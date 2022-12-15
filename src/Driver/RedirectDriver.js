import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import useUser from "../useUser";
import useDriver from "./useDriver";

const RedirectDriver = () => {
  const navigation = useNavigation();
  const { profile } = useUser();
  const { position, getActualPosition } = useDriver();

  useEffect(() => {
    if (!profile) return;

    if (!profile.isDriver) {
      navigation.navigate("DriverForm");
    } else {
      navigation.navigate("InitDriver");
    }
  }, [profile]);

  useEffect(() => {
    if (!position) getActualPosition();
  }, [position]);

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
          Iniciando FIUBER DRIVER...
        </Text>
      </View>
    </View>
  );
};

export default RedirectDriver;
