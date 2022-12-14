import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import usePassenger from "./usePassenger";

// si llega acá es porque el status del pasajero es CHOOSING
// sí o sí.
const HomePassenger = () => {
  const navigation = useNavigation();
  const { requestDriver, voyageStatus, getVoyageStatus, voyageId } =
    usePassenger();
  const [loading, setLoading] = useState(false);

  const sendRequest = () => {
    const init = {
      latitude: -34.744091,
      longitude: -58.381538,
    };
    const end = {
      latitude: -34.695531,
      longitude: -58.407651,
    };
    setLoading(true);
    requestDriver(init, end, "oGpC6dyK2lOjXgJ45PhAeK6q5ax2");
  };

  useEffect(() => {
    // la idea sería que una pantalla antes de esta
    // tire el status, y si el status del pasajero es !== "CHOOSING"
    // entonces vengo acá, con el voyageId seteado en lo que me tire
    // el getPassengerStatus.
    if (!voyageId) return;

    if (voyageStatus?.status === "WAITING") {
      navigation.navigate("Test1");
      setLoading(false);
    } else {
      navigation.navigate("Test2");
      setLoading(false);
    }
  }, [voyageStatus, voyageId]);

  useEffect(() => {
    if (voyageStatus && voyageStatus.status !== "WAITING") return;

    if (voyageId) {
      const timer = setInterval(() => getVoyageStatus(), 2000);
      return () => clearInterval(timer);
    }
  }, [voyageId, voyageStatus]);

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
        {loading ? (
          <Text style={{ fontSize: 30 }}>Enviando request...</Text>
        ) : (
          <TouchableOpacity onPress={sendRequest} style={tw`bg-blue-200`}>
            <Text style={{ fontSize: 30 }}>Enviar request</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export const Redirect = () => {
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

export default HomePassenger;
