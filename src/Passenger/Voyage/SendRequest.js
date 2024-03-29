import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import usePassenger from "../usePassenger";
import { AntDesign } from "@expo/vector-icons";

const SendRequest = () => {
  const navigation = useNavigation();
  const {
    requestDriver,
    voyageStatus,
    getVoyageStatus,
    voyageId,
    driverProfile,
    getDriverProfile,
    driver,
    screen,
    setScreen,
  } = usePassenger();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onRequest = () => {
    setLoading(true);
    requestDriver(setError);
  };

  useEffect(() => {
    // la idea sería que una pantalla antes de esta
    // tire el status, y si el status del pasajero es !== "CHOOSING"
    // entonces vengo acá, con el voyageId seteado en lo que me tire
    // el getPassengerStatus.
    if (!screen) return;
    if (!voyageId || !driverProfile) return;

    if (voyageStatus?.status === "WAITING") {
      navigation.navigate("WaitResponse");
      setLoading(false);
    } else if (voyageStatus) {
      navigation.navigate("PassengerVoyage");
      setLoading(false);
    }
  }, [voyageStatus, voyageId, screen, driverProfile]);

  useEffect(() => {
    if (!screen) return;
    if (!driver) return;

    if (!driverProfile) {
      const timer = setInterval(() => getDriverProfile(driver), 2000);
      return () => clearInterval(timer);
    }
  }, [driverProfile, screen, driver]);

  useEffect(() => {
    if (voyageStatus && voyageStatus.status !== "WAITING") return;

    if (voyageId) {
      const timer = setInterval(() => getVoyageStatus(), 2000);
      return () => clearInterval(timer);
    }
  }, [voyageId, voyageStatus]);

  const goHome = () => {
    if (voyageStatus) clearVoyage();
    navigation.navigate("MapScreen");
  };

  if (error && error.response.status === 400) {
    return <VoyageError goHome={goHome} />;
  } else if (!driverProfile) {
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
            Construyendo pedido...
          </Text>
        </View>
      </View>
    );
  } else {
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
            <TouchableOpacity
              onPress={onRequest}
              style={{
                padding: 15,
                backgroundColor: "#1495ff",
                borderRadius: 25,
              }}
            >
              <Text style={{ fontSize: 30, fontFamily: "uber1" }}>
                Solicitar viaje
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
};

const VoyageError = ({ goHome }) => {
  return (
    <View
      style={[
        tw`h-full w-full bg-gray-400`,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <View style={styles.arrivingContainer}>
        <Text style={styles.textStyle}>No tenés los fondos suficientes.</Text>
        <TouchableOpacity onPress={goHome}>
          <AntDesign
            style={tw`p-2 bg-black rounded-full`}
            name="arrowright"
            size={50}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SendRequest;

const styles = StyleSheet.create({
  arrivingContainer: {
    height: "30%",
    width: "80%",
    backgroundColor: "white",
    borderRadius: 15,
    justifyContent: "space-around",
    alignItems: "center",
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 15,
  },
  textStyle: {
    fontFamily: "uber1",
    fontSize: 24,
  },
});
