import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import useDriver from "./useDriver";

const InitDriver = () => {
  const navigation = useNavigation();
  const { status, getStatusDriver, setVoyageId, driverOnline, lastsVoyages } =
    useDriver();

  useEffect(() => {
    if (status?.Rol === "Passenger") {
      const timer = setInterval(() => {
        driverOnline();
        getStatusDriver();
      }, 2000);
      return () => clearInterval(timer);
    }
  }, [status]);

  useEffect(() => {
    if (status?.Rol === "Passenger") return;

    if (status?.Status === "SEARCHING" || !status) {
      const timer = setInterval(() => getStatusDriver(), 2000);
      return () => clearInterval(timer);
    }
  }, [status]);

  useEffect(() => {
    if (lastsVoyages) {
      navigation.navigate("TripsDriver");
      return;
    }
    if (!status) return;
    if (status?.Rol === "Driver" && status?.Status === "SEARCHING") {
      navigation.navigate("HomeDriver");
    } else if (status?.Rol === "Driver") {
      setVoyageId(status.Voyage);
      navigation.navigate("VoyageDriver");
    }
  }, [status, lastsVoyages]);

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

export default InitDriver;
