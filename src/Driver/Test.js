import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "tailwind-react-native-classnames";
import useDriver from "./useDriver";
import { useNavigation } from "@react-navigation/native";

const Test = () => {
  const navigation = useNavigation();
  const { status } = useDriver();

  useEffect(() => {
    if (!status) {
      navigation.navigate("Home");
    }
  }, [status]);

  return (
    <View style={tw`h-full w-full bg-blue-200`}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <Text style={{ fontSize: 30 }}>Home</Text>
      </View>
    </View>
  );
};

export default Test;
