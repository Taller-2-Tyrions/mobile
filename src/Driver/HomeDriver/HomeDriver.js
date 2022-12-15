import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import useDriver from "../useDriver";

const HomeDriver = () => {
  const navigation = useNavigation();
  const { status, getStatusDriver, setVoyageId } = useDriver();

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

export default HomeDriver;
