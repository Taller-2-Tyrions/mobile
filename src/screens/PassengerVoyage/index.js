import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";

const PassengerVoyage = ({ voyageId }) => {
  console.log("Esperando voyageId: ", voyageId);

  return (
    <View style={tw`h-full w-full bg-blue-200 justify-center`}>
      <Text>Viaje iniciado</Text>
    </View>
  );
};

export default PassengerVoyage;

const styles = StyleSheet.create({});
