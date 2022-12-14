import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import useDriver from "./useDriver";

const HomeDriver = () => {
  const navigation = useNavigation();
  const { status, getStatusDriver, setVoyageId, position, getPosition } =
    useDriver();

  useEffect(() => {
    if (status?.Status === "SEARCHING" || !status) {
      const timer = setInterval(() => getStatusDriver(), 2000);
      return () => clearInterval(timer);
    } else if (status) {
      console.log("Llegó un request");
    }
  }, [status]);

  useEffect(() => {
    if (!status) return;

    if (status?.Rol === "Driver" && status?.Status === "SEARCHING") {
      navigation.navigate("Test1");
    } else if (status?.Rol === "Driver") {
      setVoyageId(status.Voyage);
      navigation.navigate("Test2");
    }
  }, [status]);

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
          Iniciando FIUBER Driver...
        </Text>
      </View>
    </View>
  );
};

export default HomeDriver;
