import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import useUser from "../useUser";
import useDriver from "./useDriver";

const RedirectDriver = () => {
  const navigation = useNavigation();
  const { profile } = useUser();
  const { status, getStatusDriver, driverOnline, position, getActualPosition } =
    useDriver();

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

  /*useEffect(() => {
    if (!status || status.Rol === "Passenger") {
      const timer = setInterval(() => {
        getStatusDriver();
        if (status?.Rol === "Passenger" && position) {
          driverOnline();
        }
      }, 2000);
      return () => clearInterval(timer);
    } else {
      navigation.navigate("InitDriver");
    }
  }, [status, position]);*/

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
