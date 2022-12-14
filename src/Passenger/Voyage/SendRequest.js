import { Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import usePassenger from "../usePassenger";

const SendRequest = () => {
  const navigation = useNavigation();
  const { requestDriver, voyageStatus, getVoyageStatus, voyageId } =
    usePassenger();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // la idea sería que una pantalla antes de esta
    // tire el status, y si el status del pasajero es !== "CHOOSING"
    // entonces vengo acá, con el voyageId seteado en lo que me tire
    // el getPassengerStatus.
    if (!voyageId) {
      setLoading(true);
      requestDriver();
      return;
    }

    if (voyageStatus?.status === "WAITING") {
      navigation.navigate("WaitResponse");
      setLoading(false);
    } else if(voyageStatus) {
      navigation.navigate("PassengerVoyage");
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
          <Text style={{ fontSize: 30, fontFamily: "uber1" }}>
            Enviando request...
          </Text>
        ) : (
          <Text style={{ fontSize: 30, fontFamily: "uber1" }}>Cargando...</Text>
        )}
      </View>
    </View>
  );
};

export default SendRequest;
