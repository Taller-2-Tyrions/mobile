import { Text, View } from "react-native";
import React, { useEffect } from "react";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import usePassenger from "./usePassenger";

const Redirect = () => {
  const { getPassengerStatus, passengerStatus, setVoyageId } = usePassenger();
  const navigation = useNavigation();

  useEffect(() => {
    if (!passengerStatus || passengerStatus.Rol !== "Passenger") return;

    if (passengerStatus.Status !== "CHOOSING") {
      setVoyageId(passengerStatus.Voyage);
    }
    navigation.navigate("HomePassenger");
  }, [passengerStatus]);

  useEffect(() => {
    if (!passengerStatus) {
      const timer = setInterval(() => getPassengerStatus(), 2000);
      return () => clearInterval(timer);
    }
  }, [passengerStatus]);

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
          Iniciando FIUBER...
        </Text>
      </View>
    </View>
  );
};

export default Redirect;
